#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

NS_ASSUME_NONNULL_BEGIN

@interface RNSplashScreen : NSObject <RCTBridgeModule>

+ (void) show;

+ (void) hide;

@end

NS_ASSUME_NONNULL_END
