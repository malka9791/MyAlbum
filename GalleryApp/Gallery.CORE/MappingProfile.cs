using AutoMapper;
using Gallery.CORE.DTOs;
using Gallery.CORE.models;
using Gallery.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Gallery.CORE
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User,UserPostDto>().ReverseMap();
          //  CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<Image,ImagePostDto>().ReverseMap();
            CreateMap<Image, ImageDto>().ReverseMap();
            //CreateMap<Image, Image>().ReverseMap();

            CreateMap<Album,AlbumPostDto>().ReverseMap();
            CreateMap<Album, AlbumUpdateDto>().ReverseMap();
            CreateMap<Album, AlbumDto>().ReverseMap();

            CreateMap<Tag,TagDto>().ReverseMap();
            CreateMap<Tag, TagPostDto>().ReverseMap();

            CreateMap<Permissions,PermissionsPostDto>().ReverseMap();
            CreateMap<Permissions, PermissionsUpdateDto>().ReverseMap();
            CreateMap<Permissions, PermissionsDto>().ReverseMap();

        }
    }
}
