//
//  Userdefaults+Extension.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 29..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import Foundation

extension UserDefaults {
    func getTicket(keyName: String) -> WaitingTicket? {
        if self.object(forKey: keyName) != nil {
            guard let archiveTicket = UserDefaults.standard.object(forKey: keyName) as? Data else {
                return nil
            }
            guard let ticket = NSKeyedUnarchiver.unarchiveObject(with: archiveTicket) as? WaitingTicket else {
                return nil
            }

            return ticket
        }
        return nil
    }
}
