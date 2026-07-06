package com.server.server.dto.response;

import java.util.List;

public class ATSResponse {
    private int score;
    private List<String> matchedKeywords;
    private List<String> missingSkills;
    private List<String> suggestions;
    private String summary;

    // Default constructor
    public ATSResponse() {}

    // Constructor with all fields
    public ATSResponse(int score, List<String> matchedKeywords, List<String> missingSkills, 
                       List<String> suggestions, String summary) {
        this.score = score;
        this.matchedKeywords = matchedKeywords;
        this.missingSkills = missingSkills;
        this.suggestions = suggestions;
        this.summary = summary;
    }

    // Getters and Setters
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<String> getMatchedKeywords() {
        return matchedKeywords;
    }

    public void setMatchedKeywords(List<String> matchedKeywords) {
        this.matchedKeywords = matchedKeywords;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}