
import CountdownTimer from "@/components/timer"

export default function App() {

  // set timer to 2025

  const targetDate = new Date('2025-01-01T00:00:00+08:00'); 
    return (
      <div>
        <CountdownTimer targetDate={targetDate} />
      </div>
    )
  
}