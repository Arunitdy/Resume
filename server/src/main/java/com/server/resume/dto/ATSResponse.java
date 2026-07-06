package com.server.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ATSResponse {

    private String message;

    private String fileName;

    private int jobDescriptionLength;

}