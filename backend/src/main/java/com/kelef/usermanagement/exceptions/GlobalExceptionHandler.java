package com.kelef.usermanagement.exceptions;

import com.kelef.usermanagement.exceptions.response.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;


@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        logger.error("User not found exception: {}", ex.getMessage());

        ErrorResponse error = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        logger.error("Unexpected error occurred: {}", ex.getMessage(), ex);

        ErrorResponse error = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred",
                LocalDateTime.now()
        );

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}