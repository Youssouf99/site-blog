package com.example.blogbackend.services.category;

import com.example.blogbackend.dtos.CategoryDTO;
import com.example.blogbackend.dtos.CategoryRequestDTO;
import com.example.blogbackend.entities.Category;
import com.example.blogbackend.exceptions.ResourceAlreadyExistsException;
import com.example.blogbackend.exceptions.ResourceNotFoundException;
import com.example.blogbackend.mappers.CategoryMapper;
import com.example.blogbackend.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toCategoryDTO).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return categoryMapper.toCategoryDTO(category);
    }


    @Override
    public CategoryDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        boolean existed = categoryRepository.existsByName(categoryRequestDTO.name());
        if (existed) {
            throw new ResourceAlreadyExistsException("Category has Already exist");
        }
        Category category = categoryMapper.toCategory(categoryRequestDTO);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryDTO(savedCategory);
    }

    @Override
    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }



}
