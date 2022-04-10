import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import adminAvatarSrc from '../../../imgs/admin.jpg'
import styled from 'styled-components/macro'

const ItemCard = (props) => {

    const {item} = props

    console.log()

    return (
        <ItemCardWrapper>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="280"
                        image={item.img ? item.img : adminAvatarSrc}
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

export default ItemCard
