package com.server.resume.service;

import com.server.resume.dto.ATSResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    public ATSResponse analyzeResume(
            MultipartFile resume,
            String jobDescription
    ){

        return new ATSResponse(

                "Resume received successfully",

                resume.getOriginalFilename(),

                jobDescription.length()

        );

    }

}