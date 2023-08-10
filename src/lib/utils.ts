import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Router from "next/navigation"
import {supabase} from '../../supabase'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleLoginWithGoogle = async () => {
  try {
      const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
              queryParams: {
                  access_type: 'offline',
                  prompt: 'consent',
              },
              },
          })
  
      if (error) {
          console.error('Error signing in with Google:', error.message);
      } else {
          // Update state with the user data
          console.log('Logged in user:', data);
          Router.redirect('/');
      }
      } catch (err) {
      console.error('Error signing in with Google:');
  };}


 export  const handleLoginWithGithub = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                },
            })
    
        if (error) {
            console.error('Error signing in with Github:', error.message);
        } else {
            // Update state with the user data
            console.log('Logged in user:', data);
        }
        } catch (err) {
        console.error('Error signing in with Github:');
        }
    };

    