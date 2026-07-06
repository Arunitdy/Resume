import { useState } from "react";

import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CareerPreference from "./components/CareerPreference";
import ResumeCard from "./components/ResumeCard";
import SocialLinks from "./components/SocialLinks";

import "./Profile.css";

const Profile = () => {

    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({

        firstName: "Arun",

        lastName: "M",

        email: "arun@gmail.com",

        phone: "+91 9876543210",

        city: "Kochi",

        state: "Kerala",

        country: "India",

        college: "TKM College of Engineering",

        degree: "B.Tech",

        department: "Computer Science",

        graduationYear: "2026",

        preferredRole: "Software Engineer",

        preferredLocation: "Bangalore",

        experience: "Fresher",

        expectedSalary: "8 LPA",

        linkedin: "",

        github: "",

        portfolio: "",

        skills: [

            "Java",

            "Spring Boot",

            "React",

            "Docker",

            "Kubernetes"

        ]

    });

    const [backup, setBackup] = useState(profile);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleSave = () => {

        console.log(profile);

        // TODO
        // PUT /api/profile

        setEditing(false);

    };

    const handleCancel = () => {

        setProfile(backup);

        setEditing(false);

    };

    const handleEdit = () => {

        setBackup(profile);

        setEditing(true);

    };

    return (

        <div className="container py-5">

            <ProfileHeader
                editing={editing}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <PersonalInfo
                editing={editing}
                profile={profile}
                handleChange={handleChange}
            />

            <Education
                editing={editing}
                profile={profile}
                handleChange={handleChange}
            />

            <Skills
                editing={editing}
                profile={profile}
            />

            <CareerPreference
                editing={editing}
                profile={profile}
                handleChange={handleChange}
            />

            <ResumeCard />

            <SocialLinks
                editing={editing}
                profile={profile}
                handleChange={handleChange}
            />

        </div>

    );

};

export default Profile;