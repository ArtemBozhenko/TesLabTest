в хуке useInfiniteScroll обновление списка изначально сделал через pollingInterval
потом подумал что возможно надо обновлять весь список возвращая его к состоянию с 10 элементами, поэтому быстро накидал вариант с интервалом :)

запускать как обычно
поставить поды для ios
yarn ios/android

еще столкнулся с ошибками, все как всегда короче. Если они появяться, вот быстрые решения:

===========

How to resolve 'value' is unavailable: introduced in iOS 12.0

===========

1. In your Xcode project navigator, select Pods.
2. Under Targets, select React-Codegen
3. Set the window to Build Settings
4. Under Deployment, set iOS Deployment Target to 12.4
5. Clean project and rebuild: Product > Clean Build Folder, Product > Build

===========

In case of error: Flipper/FlipperTransportTypes.h:24:14: no template named 'function' in namespace 'std'

===========

1. adding #include <functional> to ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h