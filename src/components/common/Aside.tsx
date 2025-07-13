import { useState } from "react";

interface AsideProps {
  pages: string[],
}

const Aside = (props: AsideProps) => {
  const {page, setPage} = useState(props.pages[0]);
  return (
    <aside className="bg-[/images/aside.png] absolute right-0 h-screen">
      
    </aside>
  )
}

export default Aside;