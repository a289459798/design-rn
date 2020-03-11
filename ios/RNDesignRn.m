
#import "RNDesignRn.h"

@implementation RNDesignRn

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (BOOL) isDark {
    if (@available(iOS 13.0, *)) {
        return UITraitCollection.currentTraitCollection.userInterfaceStyle == UIUserInterfaceStyleDark;
    } else {
        return NO;
    }
}

- (NSDictionary *)constantsToExport {
    return @{
         @"isDark": [NSString stringWithFormat:@"%d", [self isDark]]
     };
}

@end
  
