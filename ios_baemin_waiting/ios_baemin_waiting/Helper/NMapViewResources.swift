//
//  NMapViewResources.swift
//  ios_baemin_waiting
//
//  Created by woowabrothers on 2017. 8. 7..
//  Copyright © 2017년 woowabrothers. All rights reserved.
//

import UIKit

// set custom POI Flag Type.
// NMapPOIflagTypeReserved 보다 큰 값으로 설정.
let userPOIflagTypeDefault: NMapPOIflagType = NMapPOIflagTypeReserved + 1
let userPOIflagTypeInvisible: NMapPOIflagType = NMapPOIflagTypeReserved + 2
//let userPOIflagTypeSelected: NMapPOIflagType = NMapPOIflagTypeReserved + 3

class NMapViewResources: NSObject {

    open static func imageWithType(_ poiFlagType: NMapPOIflagType, selected: Bool) -> UIImage? {
        switch poiFlagType {
        case NMapPOIflagTypeLocation:
            return #imageLiteral(resourceName: "pubtrans_ic_mylocation_on")
        case NMapPOIflagTypeLocationOff:
            return #imageLiteral(resourceName: "pubtrans_ic_mylocation_off")
        case userPOIflagTypeDefault:
            return #imageLiteral(resourceName: "marker")
//        case userPOIflagTypeSelected:
//            return #imageLiteral(resourceName: "pubtrans_exact_default")
        case userPOIflagTypeInvisible:
            return #imageLiteral(resourceName: "1px_dot")
        default:
            return nil
        }
    }

    open static func anchorPoint(withType type: NMapPOIflagType) -> CGPoint {
        switch type {
        case NMapPOIflagTypeLocation: fallthrough
        case NMapPOIflagTypeLocationOff: fallthrough
        case NMapPOIflagTypeCompass:
            return CGPoint(x: 0.5, y: 0.5)
        case userPOIflagTypeDefault:
            return CGPoint(x: 0.5, y: 1.0)
        case userPOIflagTypeInvisible:
            return CGPoint(x: 0.5, y: 0.5)
        default:
            return CGPoint(x: 0.5, y: 0.5)
        }
    }
}
