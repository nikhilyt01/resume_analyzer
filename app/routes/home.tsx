import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import LandingPage from "~/components/LandingPage";
import {usePuterStore} from "~/lib/puter";
import {Link} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind | Smart Resume Feedback" },
    { name: "description", content: "Get AI-powered feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv, fs, isLoading: isAuthLoading } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  
  useEffect(() => {
    if (auth.isAuthenticated) {
        const loadResumes = async () => {
            setLoadingResumes(true);
            try {
                const resumes = (await kv.list('resume:*', true)) as KVItem[];
                const parsedResumes = resumes?.map((resume) => (
                    JSON.parse(resume.value) as Resume
                ))
                setResumes(parsedResumes || []);
            } catch (error) {
                console.error("Failed to load resumes:", error);
            } finally {
                setLoadingResumes(false);
            }
        }
        loadResumes()
    }
  }, [auth.isAuthenticated]);

  const handleDeleteResume = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this resume?");
    if (!confirmed) return;

    try {
        const resumeToDelete = resumes.find(r => r.id === id);
        if (resumeToDelete) {
            if (resumeToDelete.imagePath) await fs.delete(resumeToDelete.imagePath);
            if (resumeToDelete.resumePath) await fs.delete(resumeToDelete.resumePath);
        }
        await kv.del(`resume:${id}`);
        
        // Optimistically update UI
        setResumes(prev => prev.filter(r => r.id !== id));
    } catch (error) {
        console.error("Failed to delete resume:", error);
        alert("Failed to delete resume. Please try again.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL resumes? This cannot be undone.")) return;

    setLoadingResumes(true);
    try {
        const resumeItems = (await kv.list('resume:*', true)) as KVItem[];
        if (resumeItems && resumeItems.length > 0) {
            for (const item of resumeItems) {
                try {
                    const resume = JSON.parse(item.value) as Resume;
                    if (resume.imagePath) await fs.delete(resume.imagePath);
                    if (resume.resumePath) await fs.delete(resume.resumePath);
                } catch (e) { console.error("Error cleaning up files for item:", item.key, e); }
                await kv.del(item.key);
            }
        }
        setResumes([]);
    } catch (error) {
        console.error("Failed to clear all resumes:", error);
        alert("Failed to clear some data. Please try again.");
    } finally {
        setLoadingResumes(false);
    }
  };

  if (isAuthLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading..." />
        </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
        <main className="pt-0">
            <div className="max-w-[1200px] mx-auto px-4 relative z-50">
                <Navbar />
            </div>
            <LandingPage />
        </main>
    );
  }

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <div className="flex flex-col items-center gap-4">
            {!loadingResumes && resumes?.length === 0 ? (
                <h2>No resumes found. Upload your first resume to get feedback.</h2>
            ): (
              <h2>Review your submissions and check AI-powered feedback.</h2>
            )}
            {!loadingResumes && resumes.length > 0 && (
                <button
                    onClick={handleClearAll}
                    className="text-red-500 font-semibold hover:text-red-700 transition-colors flex items-center gap-2 cursor-pointer mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Clear All Data
                </button>
            )}
        </div>
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
