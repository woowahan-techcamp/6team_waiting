package com.woowa.fileout;

import java.util.ArrayList;

public interface FileOutput<T> {
    void makeFile(T value);
}
