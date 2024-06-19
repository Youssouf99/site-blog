package com.example.blogbackend.services.category;

import com.example.blogbackend.dtos.CategoryDTO;
import com.example.blogbackend.dtos.CategoryRequestDTO;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();

    CategoryDTO getCategoryById(UUID id);

    CategoryDTO createCategory(CategoryRequestDTO categoryRequestDTO);

    void deleteCategory(UUID id);
}
