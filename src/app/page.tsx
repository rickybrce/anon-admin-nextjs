
"use client"; // This is a client component
import LeftMenu from './components/LeftMenu'
import LeftAvatarSection from './components/LeftAvatarSection'
import TopNavigation from './components/TopNavigation'
import ActiveGames from './components/ActiveGames'
import Statistic from './components/Statistic'
import TopPlayers from './components/TopPlayers'
import { useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences';
import { useRouter } from "next/navigation";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()
  
    //Check if logged in
    useEffect(() => {
      (async () => {
        const token = await Preferences.get({ key: "token" });
        if (token.value !== null) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
          //Redirect to login
           router.push('/login')
        }
      })();
    }, []);
  
  return (
    <main className="">
      {loggedIn && (
      <div className="px-[16px] py-[16px] pt-14 lg:px-[24px] xl:py-[24px] xl:pt-[24px] lg:flex max-w-[1900px] lg:ml-auto lg:mr-auto">
       <LeftMenu 
       activeItem={0}
       />
       <LeftAvatarSection />
       <div className='grow overflow-hidden mt-4 lg:mt-0'>
        <TopNavigation />
        <ActiveGames />
        <Statistic />
        <TopPlayers />
       </div>
      </div>
      )}
    </main>
  )
}
