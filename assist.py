from pathlib import Path

base = Path("client")  # change this if needed

folders = [
    "src/components/Navbar",
    "src/components/Sidebar",
    "src/components/TaskCard",
    "src/components/SkillGapCard",
    "src/components/LoadingSpinner",
    "src/pages/Login",
    "src/pages/Register",
    "src/pages/Dashboard",
    "src/pages/Profile",
    "src/pages/ResumeUpload",
    "src/pages/JobDescription",
    "src/pages/SkillGap",
    "src/pages/Roadmap",
    "src/services",
    "src/context",
    "src/routes",
]

files = [
    "src/services/authService.ts",
    "src/services/profileService.ts",
    "src/services/resumeService.ts",
    "src/services/roadmapService.ts",
]

for folder in folders:
    (base / folder).mkdir(parents=True, exist_ok=True)

for file in files:
    (base / file).touch(exist_ok=True)

print("Folders and files created successfully.")