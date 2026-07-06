package com.server.server.service;

import com.server.server.dto.response.ATSResponse;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class ResumeAnalysisService {

    // Common tech skills/keywords database
    private static final Set<String> COMMON_SKILLS = new HashSet<>(Arrays.asList(
        // Programming Languages
        "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Ruby", "PHP", "Go", "Rust",
        "Swift", "Kotlin", "Scala", "Perl", "R", "MATLAB", "Dart", "Flutter", "React Native",
        
        // Frameworks & Libraries
        "Spring Boot", "Spring", "Hibernate", "React", "Angular", "Vue.js", "Node.js", "Express.js",
        "Django", "Flask", "FastAPI", "Ruby on Rails", "ASP.NET", "Laravel", "Symfony",
        "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
        
        // Databases
        "PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL Server", "Redis", "Elasticsearch",
        "Cassandra", "DynamoDB", "Firebase", "SQLite", "MariaDB",
        
        // Cloud & DevOps
        "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "Git", "GitHub", "GitLab",
        "CI/CD", "Terraform", "Ansible", "Chef", "Puppet", "Linux", "Unix", "Shell Scripting",
        
        // Other Skills
        "Agile", "Scrum", "JIRA", "Confluence", "REST API", "GraphQL", "Microservices",
        "SOAP", "Web Services", "JSON", "XML", "HTML", "CSS", "SASS", "LESS",
        "Unit Testing", "JUnit", "Mockito", "Selenium", "Cucumber", "TestNG",
        "Design Patterns", "SOLID Principles", "Clean Code", "Code Review",
        
        // Soft Skills
        "Communication", "Teamwork", "Leadership", "Problem Solving", "Critical Thinking",
        "Time Management", "Adaptability", "Creativity", "Emotional Intelligence",
        "Conflict Resolution", "Decision Making", "Project Management"
    ));

    // Common ATS keywords
    private static final Set<String> ATS_KEYWORDS = new HashSet<>(Arrays.asList(
        "experience", "education", "skills", "certification", "project", "achievement",
        "leadership", "management", "development", "design", "analysis", "implementation",
        "testing", "deployment", "maintenance", "support", "collaboration", "innovation"
    ));

    public ATSResponse analyzeResume(MultipartFile resumeFile, String jobDescription) {
        try {
            // Extract text from resume
            String resumeText = extractTextFromFile(resumeFile);
            
            // Analyze resume against job description
            return performAnalysis(resumeText, jobDescription);
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ATSResponse(
                0,
                Collections.emptyList(),
                Collections.singletonList("Error analyzing resume: " + e.getMessage()),
                Collections.singletonList("Please try again with a valid resume file"),
                "Analysis failed due to an error"
            );
        }
    }

    private String extractTextFromFile(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename().toLowerCase();
        String content = "";
        
        if (fileName.endsWith(".pdf")) {
            // Extract text from PDF
            try (InputStream is = file.getInputStream();
                 PDDocument document = PDDocument.load(is)) {
                PDFTextStripper stripper = new PDFTextStripper();
                content = stripper.getText(document);
            }
        } else if (fileName.endsWith(".docx")) {
            // Extract text from DOCX
            try (InputStream is = file.getInputStream();
                 XWPFDocument document = new XWPFDocument(is);
                 XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
                content = extractor.getText();
            }
        } else if (fileName.endsWith(".txt")) {
            // Extract text from TXT
            try (InputStream is = file.getInputStream()) {
                content = new String(is.readAllBytes());
            }
        } else {
            throw new IllegalArgumentException("Unsupported file format. Please upload PDF, DOCX, or TXT files.");
        }
        
        return content.toLowerCase();
    }

    private ATSResponse performAnalysis(String resumeText, String jobDescription) {
        // Clean and prepare text
        String cleanResume = cleanText(resumeText);
        String cleanJobDesc = cleanText(jobDescription);
        
        // Extract keywords from job description
        List<String> jobKeywords = extractKeywords(cleanJobDesc);
        List<String> resumeKeywords = extractKeywords(cleanResume);
        
        // Find matched and missing keywords
        List<String> matchedKeywords = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();
        
        for (String keyword : jobKeywords) {
            if (resumeKeywords.contains(keyword) || cleanResume.contains(keyword)) {
                matchedKeywords.add(keyword);
            } else {
                missingSkills.add(keyword);
            }
        }
        
        // Calculate score
        int score = 0;
        if (!jobKeywords.isEmpty()) {
            score = (int) ((double) matchedKeywords.size() / jobKeywords.size() * 100);
        }
        
        // Generate suggestions
        List<String> suggestions = generateSuggestions(matchedKeywords, missingSkills, score);
        
        // Generate summary
        String summary = generateSummary(score, matchedKeywords.size(), jobKeywords.size());
        
        return new ATSResponse(
            score,
            matchedKeywords,
            missingSkills,
            suggestions,
            summary
        );
    }

    private String cleanText(String text) {
        // Remove extra whitespace, special characters, and normalize
        return text.toLowerCase()
                .replaceAll("[^a-zA-Z0-9\\s#+.]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private List<String> extractKeywords(String text) {
        Set<String> keywords = new HashSet<>();
        
        // Extract individual words
        String[] words = text.split("\\s+");
        
        // Check against common skills
        for (String word : words) {
            // Check single word skills
            if (COMMON_SKILLS.contains(word)) {
                keywords.add(word);
            }
            
            // Check multi-word skills (e.g., "spring boot")
            for (String skill : COMMON_SKILLS) {
                if (skill.contains(" ") && text.contains(skill.toLowerCase())) {
                    keywords.add(skill.toLowerCase());
                }
            }
        }
        
        // Also check for ATS keywords
        for (String atsKeyword : ATS_KEYWORDS) {
            if (text.contains(atsKeyword)) {
                keywords.add(atsKeyword);
            }
        }
        
        return new ArrayList<>(keywords);
    }

    private List<String> generateSuggestions(List<String> matchedKeywords, 
                                             List<String> missingSkills, 
                                             int score) {
        List<String> suggestions = new ArrayList<>();
        
        if (score < 30) {
            suggestions.add("🚨 Your resume score is very low. Consider rewriting it to better match the job description.");
            suggestions.add("📝 Add more relevant keywords from the job description to your resume.");
            suggestions.add("💼 Highlight your relevant work experience and achievements.");
        } else if (score < 60) {
            suggestions.add("📊 Your resume needs improvement. Focus on adding specific technical skills.");
            suggestions.add("🎯 Tailor your resume for this specific role by including more relevant keywords.");
            suggestions.add("📈 Quantify your achievements with numbers and metrics.");
        } else if (score < 80) {
            suggestions.add("👍 Your resume is good! Here are some areas for improvement:");
            suggestions.add("🔧 Add these missing skills to boost your score: " + 
                           String.join(", ", missingSkills.subList(0, Math.min(3, missingSkills.size()))));
        } else {
            suggestions.add("🎉 Your resume looks excellent for this position!");
            suggestions.add("💡 Consider adding any certifications or advanced skills to make it even stronger.");
        }
        
        // Add specific skill suggestions
        if (!missingSkills.isEmpty()) {
            suggestions.add("📚 Consider learning or adding these skills to your resume: " + 
                           String.join(", ", missingSkills.subList(0, Math.min(5, missingSkills.size()))));
        }
        
        return suggestions;
    }

    private String generateSummary(int score, int matchedCount, int totalKeywords) {
        if (score >= 80) {
            return String.format(
                "⭐ Excellent match! Your resume matches %.0f%% of the job requirements. " +
                "You have %d out of %d required keywords. This resume is highly relevant!",
                (double) score, matchedCount, totalKeywords
            );
        } else if (score >= 60) {
            return String.format(
                "✅ Good match! Your resume matches %.0f%% of the job requirements. " +
                "You have %d out of %d required keywords. Consider adding more specific skills.",
                (double) score, matchedCount, totalKeywords
            );
        } else if (score >= 40) {
            return String.format(
                "📝 Fair match. Your resume matches %.0f%% of the job requirements. " +
                "You have %d out of %d required keywords. Try to include more keywords from the job description.",
                (double) score, matchedCount, totalKeywords
            );
        } else {
            return String.format(
                "🔴 Low match. Your resume matches only %.0f%% of the job requirements. " +
                "You have %d out of %d required keywords. Significant improvement needed.",
                (double) score, matchedCount, totalKeywords
            );
        }
    }
}