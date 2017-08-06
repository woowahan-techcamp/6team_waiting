package com.woowa.fileout;

import au.com.bytecode.opencsv.CSVWriter;
import com.woowa.model.Restaurant;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * Created by woowabrothers on 2017. 8. 3..
 */
public class CSVFileOutput implements FileOutput<ArrayList>{
    private String filename;

    public CSVFileOutput(String filename) {
        this.filename = filename + ".csv";
    }

    public void makeFile(ArrayList data) {
        try {
            CSVWriter cw = new CSVWriter(new FileWriter(filename), '|', CSVWriter.NO_QUOTE_CHARACTER);
            Iterator it = data.iterator();
            try {
                while (it.hasNext()) {
                    Restaurant s = (Restaurant) it.next();
                    cw.writeNext(s.toStringArray());
                }
            } finally {
                cw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
