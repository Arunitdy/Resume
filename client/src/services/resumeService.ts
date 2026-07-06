import api from "../api/axios";

export interface ATSResponse {
    score: number;
    matchedKeywords: string[];
    missingSkills: string[];
    suggestions: string[];
    summary: string;
}

export const analyzeResume = async (
    resume: File,
    jobDescription: string
): Promise<ATSResponse> => {

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    const response = await api.post<ATSResponse>(
        "/resume/analyze",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};