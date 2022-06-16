import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import styled from 'styled-components/macro'
import {backEndUrl} from "../../../constants";

const ProductCard = (props) => {
    const {item} = props

    return (
        <ItemCardWrapper>
            <Card>
                <CardActionArea>
                    <CardMedia
                        sx={{objectFit: 'contain'}}
                        component="img"
                        height="280"
                        //image={item.image ? item.image : adminAvatarSrc}
                        image={backEndUrl + item.image}
                        alt="green iguana"
                    />
                    <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                        <Wrap>
                            <Typography variant="body2" color="text.secondary">
                                {item.price} руб.
                            </Typography>
                            <Typography  component="div" fontWeight={'fontWeightLight'} >
                                {/*{item.name}*/}
                                <CircleWrapper>
                                    <Circle>
                                        <Number>
                                            {item.tag}
                                        </Number>
                                    </Circle>
                                </CircleWrapper>
                            </Typography>

                        </Wrap>



                    </CardContent>
                </CardActionArea>
            </Card>
        </ItemCardWrapper>

    );
}
const Wrap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const ItemCardWrapper = styled.div`
  width: 350px;
`;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

const Circle = styled.div`
  min-height: 34px;
  min-width: 35px;
  padding: 5px;
  display: flex;
  text-align: center;
  vertical-align: middle;
  border-radius: 15%;
  background: #1976d2;
  margin-top: 3px;
  margin-right: 8px;
`

const Number = styled.div`
  margin: auto;
  color: white;
  //color: #FFFFFF;


`;

export default ProductCard
