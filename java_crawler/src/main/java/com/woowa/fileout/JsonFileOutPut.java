package com.woowa.fileout;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class JsonFileOutPut implements FileOutput<String>{
    String fileName;

    public JsonFileOutPut(String fileName) {
        this.fileName = fileName+".json";
    }

    public void makeFile(String data) {
        try {
            FileWriter file = new FileWriter(fileName);
            file.write(data);
            file.flush();
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
