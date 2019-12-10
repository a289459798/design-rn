//
//  RNSplashScreen.m
//  Base64
//
//  Created by zhangzy on 2019/12/10.
//

#import "RNSplashScreen.h"

static UIView *_view;
static FLAnimatedImageView *_imageView;
static float _time;
static NSTimer *_timer;

@implementation RNSplashScreen {
    RCTResponseSenderBlock _block;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+(void)show {
    
    UIWindow *window = [[UIApplication sharedApplication] delegate].window;
    CGSize viewSize = window.bounds.size;
    NSString *viewOrientation = @"Portrait";
    
    NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
    for (NSDictionary* dict in imagesDict) {
        CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
        if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]]) {
            
            NSString *lanuchImage = dict[@"UILaunchImageName"];
            _view = [[UIView alloc] initWithFrame:window.bounds];
            UIImageView *launchView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:lanuchImage]];
            launchView.frame = window.bounds;
            launchView.contentMode = UIViewContentModeScaleAspectFill;
            [_view addSubview:launchView];
            int marginBottom = 180;
            
            _imageView = [[FLAnimatedImageView alloc] initWithFrame:CGRectMake(0, 0, window.bounds.size.width, window.bounds.size.height - marginBottom)];
            _imageView.contentMode = UIViewContentModeScaleAspectFill;
            _imageView.clipsToBounds = YES;
            
            [_view addSubview:_imageView];
            [_view bringSubviewToFront:_imageView];
            
            [window.rootViewController.view addSubview:_view];
            [window.rootViewController.view bringSubviewToFront:_view];
            
            break;
        }
    }
}

+ (void)hide {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if(_timer != nil) {
            [_timer invalidate];
            _timer = nil;
        }
        [UIView animateWithDuration:1.0f delay:0.1f options:UIViewAnimationOptionBeginFromCurrentState animations:^{
            
            _view.alpha = 0.0f;
            _view.layer.transform = CATransform3DScale(CATransform3DIdentity, 1.2, 1.2, 1);
            
        } completion:^(BOOL finished) {
            [_view removeFromSuperview];
        }];
    });
    
}

- (void) click {
    
    if(_block != nil) {
        _block(@[]);
        _block = nil;
    }
}

RCT_EXPORT_METHOD(hide) {
    [RCTSplashScreen hide];
}

RCT_EXPORT_METHOD(showAd: (NSDictionary *) data
                  Callback: (RCTResponseSenderBlock)callback) {
    
    _block = callback;
    
    dispatch_async(dispatch_get_main_queue(), ^{
        
        _time = 3.0;
        {
            RCTResponseSenderBlock _block;
        }
        NSString *imageUrl = [data objectForKey:@"source"];
        if([imageUrl hasSuffix:@".gif"]) {
            NSData *imageData = [NSData dataWithContentsOfFile:imageUrl];
            _imageView.animatedImage = [FLAnimatedImage animatedImageWithGIFData:imageData];
        } else {
            [_imageView setImage:[UIImage imageNamed: imageUrl]];
        }
        
        [_imageView setUserInteractionEnabled:YES];
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(click)];
        [_imageView addGestureRecognizer:tap];
        _timer = [NSTimer scheduledTimerWithTimeInterval:0.01 target:self selector:@selector(updateProgress) userInfo:nil repeats:YES];
    });
}

@end
