package com.woowa.fileout;

public interface FileOutput<T> {
    void makeFile(T value);
}
