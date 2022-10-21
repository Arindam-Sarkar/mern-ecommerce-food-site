import React, { useEffect, useState } from 'react'
import NavbarComp from '../../components/navbar/NavbarComp'
import Product from '../../components/product/Product'
import './search.css'

import { foodDataResource } from '../../foodData'
import { useLocation } from 'react-router-dom'


const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  useEffect(() => {
    setSearchData([])
    setSearchTerm("")

    setSearchTerm(location.search?.slice(1).toLowerCase().toString())
  }, [location])

  useEffect(() => {
    if ((searchTerm.length !== 0) && (searchTerm !== undefined)) {
      let searchDataTmp = foodDataResource.filter((item) => {
        // Check for term in name, discription and type
        if (
          item.name.toString().toLowerCase().includes(searchTerm) ||
          item.desc.toString().toLowerCase().includes(searchTerm) ||
          item.type.toString().toLowerCase().includes(searchTerm)
        ) {
          return (item)
        }
        else {
          return
        }
      })

      if (searchDataTmp.length != 0) {
        console.log("Writing");
        setSearchData(searchDataTmp)
      } else {
        setSearchData([])
      }
    }

  }, [searchTerm])

  return (
    <>
      {(searchData.length !== 0) ?
        (<div className='pageMcont'>
          <div className='pageCont'>
            {
              searchData.map((item, index) => {
                console.log(item)
                if (item !== undefined) {
                  return (
                    <div className="pageProduct" key={index} >
                      <Product item={item} />
                    </div>
                  )
                }
              })
            }
          </div>
        </div>) :
        (<div className='searchMcont'>Please enter a valid search term</div>)
      }

    </>
  )
}

export default Search