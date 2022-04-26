import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import adminAvatarSrc from '../../../imgs/admin.jpg'
import styled from 'styled-components/macro'


const ProductCard = (props) => {

    const backEndUrl = 'http://localhost:8080/'

    const {item} = props


    // console.log(item.image)

   // http://localhost:8080/c079aaa2-7c48-4234-81fa-7fdeb31e509c.jpg


    return (
        <ItemCardWrapper>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="280"
                        //image={item.image ? item.image : adminAvatarSrc}
                        image={ backEndUrl + item.image }
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {item.price} руб.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ItemCardWrapper>

    );
}

const ItemCardWrapper = styled.div`
  min-width: 250px;
  max-width: 300px;
  max-height: 400px;
`;

export default ProductCard
