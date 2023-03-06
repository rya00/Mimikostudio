import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pagination } from 'react-bootstrap'

function Paginate({pages, page, keyword='', isAdmin = false}) {
    const navigate = useNavigate()

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    console.log('Keyword:', keyword)

    const clickHandler = (page) => {
        const redirect = !isAdmin ? 
        {
            pathname:"/",
            search:`?keyword=${keyword}&page=${page}`
        }
        :
            {
                pathname:'/admin/productlist/',
                search:`?keyword=${keyword}&page=${page}`
            }
        navigate(redirect)
    }


    return (pages > 1 && (
        <Pagination linkClass="">
            {[...Array(pages).keys()].map((x) => (
                <Pagination.Item  key={x + '-page-item'} active={x + 1 === page } onClick={() => clickHandler(x+1)}>{x + 1}</Pagination.Item>                    
            ))}
        </Pagination>
    )
    )
}

export default Paginate





