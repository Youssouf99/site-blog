package com.example.blogbackend.mappers;

import com.example.blogbackend.dtos.CategoryDTO;
import com.example.blogbackend.dtos.CategoryRequestDTO;
import com.example.blogbackend.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toCategoryDTO(Category category);

    @Mapping(target = "articles", ignore = true)
    Category toCategory(CategoryDTO categoryDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "articles", ignore = true)
    Category toCategory(CategoryRequestDTO categoryRequestDTO);

}
