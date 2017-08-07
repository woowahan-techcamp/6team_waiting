//
//  NURLEncoder.h
//  ApiGateway-MAC
//
//  Created by KJ KIM on 10. 03. 24.
//  Copyright 2010 NHN. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface NURLEncoder : NSObject {

}

+ (NSString *) encodeUrl:(NSString *)url encoding:(CFStringEncoding)encoding;
@end
