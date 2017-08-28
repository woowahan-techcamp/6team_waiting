//
//  WaitingTicket.swift
//  ios_baemin_waiting
//
//  Created by 홍창남 on 2017. 8. 19..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

class WaitingTicket: NSObject, NSCoding {
    private(set) var name: String
    private(set) var phoneNumber: String {
        didSet {
            self.phoneNumber = "010" + phoneNumber
        }
    }
    private(set) var headCount: Int
    private(set) var isStaying: Bool
    private(set) var storeId: Int

    private var _ticketNumber: Int
    private var _storeName: String
    private var _currentInLine: Int

    override init() {
        self.name = ""
        self.phoneNumber = ""
        self.headCount = 0
        self.isStaying = true
        self.storeId = 0
        self._ticketNumber = 0
        self._storeName = ""
        self._currentInLine = 0
    }

    convenience init(name: String, phoneNumber: String, headCount: Int, isStaying: Bool, storeId: Int) {
        self.init()
        self.name = name
        self.phoneNumber = "010" + phoneNumber
        self.headCount = headCount
        self.isStaying = isStaying
        self.storeId = storeId
        self._ticketNumber = 0
        self._storeName = ""
        self._currentInLine = 0
    }

    func encode(with aCoder: NSCoder) {
        aCoder.encode(self.name, forKey: "name")
        aCoder.encode(self.phoneNumber, forKey: "phoneNumber")
        aCoder.encode(self.headCount, forKey: "headCount")
        aCoder.encode(self.isStaying, forKey: "isStaying")
        aCoder.encode(self.storeId, forKey: "storeId")
        aCoder.encode(self._ticketNumber, forKey: "_ticketNumber")
        aCoder.encode(self._storeName, forKey: "_storeName")
        aCoder.encode(self._currentInLine, forKey: "_currentInLine")
    }

    required init?(coder aDecoder: NSCoder) {
        self.name = aDecoder.decodeObject(forKey: "name") as! String
        self.phoneNumber = aDecoder.decodeObject(forKey: "phoneNumber") as! String
        self.headCount = aDecoder.decodeInteger(forKey: "headCount")
        self.isStaying = aDecoder.decodeBool(forKey: "isStaying")
        self.storeId = aDecoder.decodeInteger(forKey: "storeId")
        self._ticketNumber = aDecoder.decodeInteger(forKey: "_ticketNumber")
        self._storeName = aDecoder.decodeObject(forKey: "_storeName") as! String
        self._currentInLine = aDecoder.decodeInteger(forKey: "_currentInLine")
    }

    public var ticketNumber: Int {
        get { return self._ticketNumber }
        set { self._ticketNumber = newValue }
    }

    public var storeName: String {
        get { return self._storeName }
        set { self._storeName = newValue }
    }

    public var currentInLine: Int {
        get { return self._currentInLine }
        set { self._currentInLine = newValue }
    }
}
