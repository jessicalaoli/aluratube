import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ezgoorzfgndkgijwhwit.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z29vcnpmZ25ka2dpandod2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzkzMjcsImV4cCI6MTk4Mzk1NTMyN30.5iP-RY0ScChZEIyX9S-QKSjIKhdDuvHDzRbznICrOvE";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}