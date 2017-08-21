//
//  WaitingTicket.swift
//  ios_baemin_waiting
//
//  Created by 홍창남 on 2017. 8. 19..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

struct WaitingTicket {
    private(set) var name: String
    private(set) var phoneNumber: String {
        didSet {
            self.phoneNumber = "010" + phoneNumber
        }
    }
    private(set) var headCount: Int
    private(set) var isStaying: Bool

    init(name: String, phoneNumber: String, headCount: Int, isStaying: Bool) {
        self.name = name
        self.phoneNumber = "010" + phoneNumber
        self.headCount = headCount
        self.isStaying = isStaying
    }
}
