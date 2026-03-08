package com.yashSharma.BillingSoftware.service.impl;

import java.io.IOException;
import java.nio.file.*;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadServiceImpl {



    private final Path fileStorageLocation;

    @Autowired
    public FileUploadServiceImpl(Environment env) {
        this.fileStorageLocation = Paths.get(env.getProperty("app.file.upload-dir", "./uploads/files"))
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException(
                    "Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return null;
        }
        String[] fileNameParts = fileName.split("\\.");

        return fileNameParts[fileNameParts.length - 1];
    }


    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName =
                new Date().getTime() + "-file." + getFileExtension(file.getOriginalFilename());

        try {
            // Check if the filename contains invalid characters
            if (fileName.contains("..")) {
                throw new RuntimeException(
                        "Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "C:/Users/laksh/Desktop/BillingSoftware/BillingSoftwareBackend/uploads/files/"+fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public boolean deleteFile(String str){
        try {

            String path = "C:/Users/laksh/Desktop/BillingSoftware/BillingSoftwareBackend/uploads/files/" + str;


            Files.deleteIfExists(Path.of(path));
        }
        // Exceptions
        catch (NoSuchFileException e) {
            System.out.println("No such file/directory exists");
        }
        catch (DirectoryNotEmptyException e) {
            System.out.println("Directory is not empty.");
        }
        catch (IOException e) {
            System.out.println("Invalid permissions.");
        }
        return false;
    }
}