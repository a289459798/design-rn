//
//  RNImageBrowser.m
//  Base64
//
//  Created by zhangzy on 2019/12/11.
//

#import "RNImageBrowser.h"
#import "KSPhotoBrowser.h"

@implementation RNImageBrowser

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSArray *)list index:(int)index) {
    
    NSMutableArray *items = @[].mutableCopy;
    UIWindow *window = [[UIApplication sharedApplication] delegate].window;
    CGSize viewSize = window.bounds.size;
    for (int i = 0; i < list.count; i++) {
        // Get the large image url
        NSString *url = [list[i] stringByReplacingOccurrencesOfString:@"bmiddle" withString:@"large"];
        UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, viewSize.width, viewSize.height)];
        KSPhotoItem *item = [KSPhotoItem itemWithSourceView:imageView imageUrl:[NSURL URLWithString:url]];
        [items addObject:item];
    }
    KSPhotoBrowser *browser = [KSPhotoBrowser browserWithPhotoItems:items selectedIndex:0];
    [browser showFromViewController:window.rootViewController];
}

@end
