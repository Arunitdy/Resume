package com.server.server.controller;

import com.server.server.dto.response.ATSResponse;
import com.server.server.service.ResumeAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeAnalysisService resumeAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<ATSResponse> analyzeResume(
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("jobDescription") String jobDescription) {
        
        System.out.println("Resume analysis request received");
        System.out.println("File name: " + resume.getOriginalFilename());
        System.out.println("File size: " + resume.getSize() + " bytes");
        System.out.println("Job description length: " + jobDescription.length());
        
        // Validate file
        if (resume.isEmpty()) {
            ATSResponse errorResponse = new ATSResponse(
                0,
                java.util.Collections.emptyList(),
                java.util.Collections.singletonList("Resume file is empty"),
                java.util.Collections.singletonList("Please upload a valid resume file"),
                "Analysis failed: Empty file"
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        // Validate file type
        String fileName = resume.getOriginalFilename().toLowerCase();
        if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx") && !fileName.endsWith(".txt")) {
            ATSResponse errorResponse = new ATSResponse(
                0,
                java.util.Collections.emptyList(),
                java.util.Collections.singletonList("Unsupported file format"),
                java.util.Collections.singletonList("Please upload PDF, DOCX, or TXT files only"),
                "Analysis failed: Unsupported file type"
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        // Validate job description
        if (jobDescription == null || jobDescription.trim().isEmpty()) {
            ATSResponse errorResponse = new ATSResponse(
                0,
                java.util.Collections.emptyList(),
                java.util.Collections.singletonList("Job description is empty"),
                java.util.Collections.singletonList("Please provide a job description"),
                "Analysis failed: Missing job description"
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        try {
            // Perform analysis
            ATSResponse response = resumeAnalysisService.analyzeResume(resume, jobDescription);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ATSResponse errorResponse = new ATSResponse(
                0,
                java.util.Collections.emptyList(),
                java.util.Collections.singletonList(e.getMessage()),
                java.util.Collections.singletonList("Try a different file format"),
                "Analysis failed: " + e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            e.printStackTrace();
            ATSResponse errorResponse = new ATSResponse(
                0,
                java.util.Collections.emptyList(),
                java.util.Collections.singletonList("Error processing resume: " + e.getMessage()),
                java.util.Collections.singletonList("Please try again or contact support"),
                "Analysis failed due to server error"
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}