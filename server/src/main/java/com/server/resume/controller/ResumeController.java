package com.server.resume.controller;

import com.server.resume.dto.ATSResponse;
import com.server.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping(
            value="/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ATSResponse analyzeResume(

            @RequestPart("resume")
            MultipartFile resume,

            @RequestPart("jobDescription")
            String jobDescription

    ){

        return resumeService.analyzeResume(

                resume,

                jobDescription

        );

    }

}