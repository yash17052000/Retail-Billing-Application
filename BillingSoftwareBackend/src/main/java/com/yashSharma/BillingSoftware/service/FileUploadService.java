package com.yashSharma.BillingSoftware.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    String uploadFile(MultipartFile multipartFile);
    boolean deleteFile(String imgUrl);
}
