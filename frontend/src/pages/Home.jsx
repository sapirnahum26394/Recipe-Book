import React from 'react'
import Categories from '../components/Categories'
import Favorites from '../components/Favorites'
import { motion } from 'framer-motion'

function Home() {
  // const [fields, updateFields] = useState(
  //   {
  //     name: 'Admin',
  //     email: 'admin@example.com',
  //     mobile_no: '012345678'
  //   }
  // );
  return (
    <motion.div
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      transition={{duration:0.5}}
    >      

      {/* <NewRecipe fields={fields} updateFields={updateFields}/> */}
      <Categories/>
      <Favorites/>
    </motion.div>
  )
}

export default Home