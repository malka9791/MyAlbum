// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
// import { useParams } from 'react-router';
// import { useState } from 'react';
// type Image={
//         id: number,
//         name: string,
//         imgUrl: string,
//         imgType: string,
//         createdAt: Date,
//         tag: {
//           id: number
//           name: string;
//         }|null
// }
// const ShowImages=()=>
// {
//     const {albumId}=useParams();
//     const [imagesData,setImagesData]=useState()
//     // try {
//     //     const res = await axios.get(`${api}/album/${albumId}`);
        
//     //     console.log(res.data);
//     //   } catch (error) {
//     //     console.error("error fetching album", error);
//     //   }

//   return (
//     <ImageList sx={{ width: 500, height: 450 }}>
//       <ImageListItem key="Subheader" cols={2}>
//         <ListSubheader component="div">December</ListSubheader>
//       </ImageListItem>
//       {imagesData.map((image) => (
//         <ImageListItem key={image.img}>
//           <img
//             srcSet={`${image.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//             src={`${item.img}?w=248&fit=crop&auto=format`}
//             alt={item.title}
//             loading="lazy"
//           />
//           <ImageListItemBar
//             title={item.title}
//             subtitle={item.author}
//             actionIcon={
//               <IconButton
//                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//                 aria-label={`info about ${item.title}`}
//               >
//                 <InfoIcon />
//               </IconButton>
//             }
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }


// export default ShowImages;