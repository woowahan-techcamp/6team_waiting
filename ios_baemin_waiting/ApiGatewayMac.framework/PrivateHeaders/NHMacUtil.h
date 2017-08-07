//
//  NHMacUtil.h
//  ApiGateway-MAC
//
//  Created by KJ KIM on 10. 03. 24.
//  Copyright 2010 NHN. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonHMAC.h>

@interface NHMacUtil : NSObject {

}

// Obtain the final Message Authentication Code with the HMAC algorithm SHA1
+ (NSString*) digestMessage:(NSString *)message withKey:(NSString *)key;
+ (NSString*) digestMessage:(NSString *)message withKeyData:(NSData *)keyData;
+ (NSString*) digestMessageData:(NSData *)messageData withKeyData:(NSData *)keyData;

+ (CCHmacContext) macContextWithKey:(NSString *)key;
+ (NSString*) digestMessage:(NSString *)message withMacContext:(CCHmacContext *)pHmacContext;
+ (NSString*) digestMessageData:(NSData *)messageData withMacContext:(CCHmacContext *)pHmacContext;
@end
