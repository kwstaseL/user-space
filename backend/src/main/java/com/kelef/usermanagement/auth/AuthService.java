package com.kelef.usermanagement.auth;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import java.nio.charset.StandardCharsets;

@Service
public class AuthService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String generateToken() {
        try {
            Instant now = Instant.now();
            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject("app-user") // token belongs to
                    .issueTime(java.util.Date.from(now)) // issue time
                    .expirationTime(java.util.Date.from(now.plus(1, ChronoUnit.DAYS))) // 1 day expiration
                    .jwtID(UUID.randomUUID().toString())
                    .build();

            JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.HS256).build(); // algorithm to use

            SignedJWT signedJWT = new SignedJWT(header, claims);
            MACSigner signer = new MACSigner(jwtSecret.getBytes(StandardCharsets.UTF_8)); // sign
            signedJWT.sign(signer);

            return signedJWT.serialize();

        } catch (JOSEException e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }
}