## [1.33.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.5...v1.33.6) (2026-01-19)


### Bug Fixes

* update worklow ([d881fa0](https://github.com/CoCreate-app/CoCreate-filter/commit/d881fa0060156d9943eaf238579c5fc231ff2ab9))

## [1.33.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.4...v1.33.5) (2025-11-16)


### Bug Fixes

* comment out elements.set in initElement and update filter.query in getElementFilters ([9620738](https://github.com/CoCreate-app/CoCreate-filter/commit/9620738f07f4d229d0cef4a2666adcf2652a4288))

## [1.33.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.3...v1.33.4) (2025-09-07)


### Bug Fixes

* handle empty array in applyQuery and update applySearch for logical operators ([bf92802](https://github.com/CoCreate-app/CoCreate-filter/commit/bf9280280e2b8ea961e35280efbd7623d42dfc27))
* return filters instead of filteredElements in initElement function ([a57f87e](https://github.com/CoCreate-app/CoCreate-filter/commit/a57f87e8964f73f2cf3e8bdc5ea6f6bc8797b85f))

## [1.33.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.2...v1.33.3) (2025-05-01)


### Bug Fixes

* update [@cocreate](https://github.com/cocreate) dependencies ([a149ae9](https://github.com/CoCreate-app/CoCreate-filter/commit/a149ae9ea6d659f005fd40095bc378323174a06c))

## [1.33.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.1...v1.33.2) (2025-04-30)


### Bug Fixes

* added css-loader ([e520edb](https://github.com/CoCreate-app/CoCreate-filter/commit/e520edb162ef9284b737407aa830695dd695fafe))
* update query attributes ([c8b12a1](https://github.com/CoCreate-app/CoCreate-filter/commit/c8b12a10ac239e3fd92f503a2f1c4b763b261680))
* updated cocreate modules versions ([929887d](https://github.com/CoCreate-app/CoCreate-filter/commit/929887dc2aad9a9925ce3f14f24fae738cda90b9))
* webpack.config and devdependencies ([031bccf](https://github.com/CoCreate-app/CoCreate-filter/commit/031bccf5ada056a26dca87241037f3cac755383b))

## [1.33.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.33.0...v1.33.1) (2025-04-11)


### Bug Fixes

* if mutation attribute name is value check for other required atributes like filter-key, etc ([1ee4f32](https://github.com/CoCreate-app/CoCreate-filter/commit/1ee4f32e1729477fb799f978857dc4627b951e7c))
* loop when input event fires on render elements ([d7221da](https://github.com/CoCreate-app/CoCreate-filter/commit/d7221da84672cc35fad75600bd483f1e7a2e244d))
* prefix-document to target elements within current document ([78d254c](https://github.com/CoCreate-app/CoCreate-filter/commit/78d254c50527b12756dc2fc5336918d03429ff02))
* update observer observe param to type and and attributeName to attributeFilter ([ad4826e](https://github.com/CoCreate-app/CoCreate-filter/commit/ad4826eaab56533a0eb7dbb8239014a33f129565))

# [1.33.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.32.0...v1.33.0) (2025-01-18)


### Bug Fixes

* query merge ([ff9fc9f](https://github.com/CoCreate-app/CoCreate-filter/commit/ff9fc9f5febdc411ae2ba53e64338628c09f9023))


### Features

* query supports all elements ([b3a58e0](https://github.com/CoCreate-app/CoCreate-filter/commit/b3a58e0e0d1263790d70207e531d9a399af6001a))
* update filter-query-key now accepts an operator ([01bcb36](https://github.com/CoCreate-app/CoCreate-filter/commit/01bcb3686213c3f2ec98d6f399a35e69d38ab38a))

# [1.32.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.31.0...v1.32.0) (2024-12-14)


### Bug Fixes

* init caused filter ti not initialized commented code causing issue ([87fc647](https://github.com/CoCreate-app/CoCreate-filter/commit/87fc647dbcf48af69557678543a7f246bf15e1c0))


### Features

* filter-key now used to handle projections. filter-query-key for appplying filters ([d8851f1](https://github.com/CoCreate-app/CoCreate-filter/commit/d8851f105d2aa87bf9a1cb26757755fd9c0b74e4))
* init accepts an element to intialize else it will document query filter elements ([f7c7915](https://github.com/CoCreate-app/CoCreate-filter/commit/f7c79155d575a550ca428372901a33c3d8d57f94))

# [1.31.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.30.1...v1.31.0) (2024-11-04)


### Bug Fixes

* observer taget has been renamed to selector ([a2bcb40](https://github.com/CoCreate-app/CoCreate-filter/commit/a2bcb40927437d16c0d1609dfbe65aa4eb8bf927))
* pretier.config.js and file formating ([90e94ed](https://github.com/CoCreate-app/CoCreate-filter/commit/90e94edb932aeea1c2539d4222832e6a84466a6e))
* removed intersectunobserve ([d720b21](https://github.com/CoCreate-app/CoCreate-filter/commit/d720b216d978dea19702f90a2f96bab3b15b8c10))


### Features

* add prettier.config.js and format files ([0be1aa5](https://github.com/CoCreate-app/CoCreate-filter/commit/0be1aa543e23c05ded3cc2aa4675d66ef834f2ae))

## [1.30.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.30.0...v1.30.1) (2024-06-19)


### Bug Fixes

* if filteredElement not found continue ([6307248](https://github.com/CoCreate-app/CoCreate-filter/commit/6307248f1ab17901729c3d5e3aa98a287aab1a71))
* set filter.overwrite true ([41ef5e7](https://github.com/CoCreate-app/CoCreate-filter/commit/41ef5e7e9a144b66a638cb0355e4415ab024c3e1))
* to set filter limit as infinite apply empty filter-limit attribute ([4652521](https://github.com/CoCreate-app/CoCreate-filter/commit/4652521cc81a2aa5806b1b7a65a8ce934579b339))

# [1.30.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.29.0...v1.30.0) (2024-06-12)


### Bug Fixes

* bump cocreate dependencies ([f872796](https://github.com/CoCreate-app/CoCreate-filter/commit/f87279664be228b85bc1d54edde2c59dcbfb1a04))
* filter-limit defualts to 20 if undefined ([38e6c67](https://github.com/CoCreate-app/CoCreate-filter/commit/38e6c672c56c68d9007f1152766b4f9ee250ab3a))
* svg icon class ([35dde17](https://github.com/CoCreate-app/CoCreate-filter/commit/35dde1784036b77c25984d70e0bc9fda605d7490))


### Features

* handle regex flag ([5fccc3b](https://github.com/CoCreate-app/CoCreate-filter/commit/5fccc3b6359229cfe05e3e4a44e864e0c07eaf3b))

# [1.29.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.7...v1.29.0) (2024-05-08)


### Features

* support operators local storage operators ([bb79f3b](https://github.com/CoCreate-app/CoCreate-filter/commit/bb79f3b4871ec32ad8d2ff4eb834069d1e87a8d8))

## [1.28.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.6...v1.28.7) (2024-04-29)


### Bug Fixes

* bump cocreate dependencies ([2d1107f](https://github.com/CoCreate-app/CoCreate-filter/commit/2d1107fda61b29f64d2a0491c352330ad8a5824b))

## [1.28.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.5...v1.28.6) (2024-02-13)


### Bug Fixes

* initElements ([c9dda7b](https://github.com/CoCreate-app/CoCreate-filter/commit/c9dda7b69ed94800b101fb48b9dd953257952e7b))

## [1.28.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.4...v1.28.5) (2024-02-05)


### Bug Fixes

* Removed https://cdn.cocreate.app/latest/CoCreate.min.css ([0ae6a92](https://github.com/CoCreate-app/CoCreate-filter/commit/0ae6a92b83ad0f45b2a1e9b8b511a09d29766e01))

## [1.28.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.3...v1.28.4) (2024-02-03)


### Bug Fixes

* handle if $user_id returns null ([14f320e](https://github.com/CoCreate-app/CoCreate-filter/commit/14f320e82960bf3e2443d1cff5f697916ce76bda))

## [1.28.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.2...v1.28.3) (2024-01-30)


### Bug Fixes

* if $in query value needs to be an array ([08e28df](https://github.com/CoCreate-app/CoCreate-filter/commit/08e28dfc21afa30bb96ae6a9f984587111d93878))

## [1.28.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.1...v1.28.2) (2024-01-17)


### Bug Fixes

* improved filter creation ([4de1f44](https://github.com/CoCreate-app/CoCreate-filter/commit/4de1f44d1d3018bd02f2435a4180c623ddc16694))
* removed test logs ([9f4f16c](https://github.com/CoCreate-app/CoCreate-filter/commit/9f4f16c94e464281749f0b167e1d6268d52029d8))
* update to support new query system ([f6b354b](https://github.com/CoCreate-app/CoCreate-filter/commit/f6b354b927e20249ed1e8d68b6da8ad5422d35e3))

## [1.28.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.28.0...v1.28.1) (2023-12-18)


### Bug Fixes

* delete filter.overwrite ([1e2d4b0](https://github.com/CoCreate-app/CoCreate-filter/commit/1e2d4b0758437dd9f4ea81691e742e16c9c1fcd2))

# [1.28.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.27.0...v1.28.0) (2023-11-25)


### Bug Fixes

* update licensing details ([fe01900](https://github.com/CoCreate-app/CoCreate-filter/commit/fe01900e477d5a1f1cbf10189662c1a7f2276299))


### Features

* upgrade dependencies for latest features and fixes ([8eeee8f](https://github.com/CoCreate-app/CoCreate-filter/commit/8eeee8fe0ad7d38cdecd7391f65208e54319f210))

# [1.27.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.26.0...v1.27.0) (2023-11-25)


### Bug Fixes

* update nav, edit button and css path ([8339de1](https://github.com/CoCreate-app/CoCreate-filter/commit/8339de184899992870697219e5c9d98518bc49d3))


### Features

* upgrade dependencies for latest features and fixes ([edd6fa3](https://github.com/CoCreate-app/CoCreate-filter/commit/edd6fa3c089a8e161b5c009503bffbeefd3a4455))

# [1.26.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.25.0...v1.26.0) (2023-11-19)


### Features

* update dependecies for th latest features and bug fixes ([51afe71](https://github.com/CoCreate-app/CoCreate-filter/commit/51afe715f8917d51e6f3de9ea089c76af0992aac))

# [1.25.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.24.0...v1.25.0) (2023-11-16)


### Bug Fixes

* compare mutation attribute observer if same return ([1b8e11b](https://github.com/CoCreate-app/CoCreate-filter/commit/1b8e11b7195dd5ba7939e3aed9a891722272d15a))
* filter-name renamed to filter-key ([5e4579d](https://github.com/CoCreate-app/CoCreate-filter/commit/5e4579d71e09b4ae7378c60114a32835b72e3a48))


### Features

* fiter-index attribute and filter.overwite boolean ([e1775b8](https://github.com/CoCreate-app/CoCreate-filter/commit/e1775b82ac2ecb7f13beb4fa7ed2ee87e5fc3494))

# [1.24.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.8...v1.24.0) (2023-11-12)


### Bug Fixes

* bump dependencies for latest features ([b709097](https://github.com/CoCreate-app/CoCreate-filter/commit/b7090973b6de25bd562a6098a480ee55f058e5b4))
* if not loadmore set index to 0 ([811719e](https://github.com/CoCreate-app/CoCreate-filter/commit/811719e0f062e5be259d2832e6fe1c98f6df18b3))


### Features

* observe removedNodes ([62b714e](https://github.com/CoCreate-app/CoCreate-filter/commit/62b714e18149a314ee66798ca438dcba6f628e91))

## [1.23.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.7...v1.23.8) (2023-11-09)


### Bug Fixes

* meta name typo ([1fdc9ed](https://github.com/CoCreate-app/CoCreate-filter/commit/1fdc9ed9f3eca15f4d8d79e12445fc18336d52e9))
* update host ([675cc3d](https://github.com/CoCreate-app/CoCreate-filter/commit/675cc3d7e88fb6ed08e327e41695dd265981eae0))

## [1.23.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.6...v1.23.7) (2023-11-03)


### Bug Fixes

* favicon.ico path ([26cae72](https://github.com/CoCreate-app/CoCreate-filter/commit/26cae7227dffa4f93d11d0bb72ef70f0092d2e63))
* update dependencies to the lates versions ([0fada78](https://github.com/CoCreate-app/CoCreate-filter/commit/0fada781096f35acc740fa19f7439e4ff919cc45))

## [1.23.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.5...v1.23.6) (2023-10-25)


### Bug Fixes

* bump dependencies ([69b81dd](https://github.com/CoCreate-app/CoCreate-filter/commit/69b81dd367d79133c388def0195a19df347cf7ce))

## [1.23.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.4...v1.23.5) (2023-10-17)


### Bug Fixes

* await getValue() ([ac14de2](https://github.com/CoCreate-app/CoCreate-filter/commit/ac14de21e7e4730f3a961f1cd3b07ed1c812e617))

## [1.23.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.3...v1.23.4) (2023-10-14)


### Bug Fixes

* await init for filter checks ([91b7ab1](https://github.com/CoCreate-app/CoCreate-filter/commit/91b7ab1ea744df399c367005b7dfc737d3847a10))
* bump dependencies ([1e12617](https://github.com/CoCreate-app/CoCreate-filter/commit/1e12617e130aa3e4e34800228705d71e0e365a45))

## [1.23.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.2...v1.23.3) (2023-10-09)


### Bug Fixes

* bump dependencies ([1d23be0](https://github.com/CoCreate-app/CoCreate-filter/commit/1d23be0500c32075fa13f25c47f0b0da7141c317))

## [1.23.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.1...v1.23.2) (2023-10-09)


### Bug Fixes

* bump dependencies ([233c748](https://github.com/CoCreate-app/CoCreate-filter/commit/233c74852c24d1e3af5805fe61aa3265a0b934d4))

## [1.23.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.23.0...v1.23.1) (2023-10-09)


### Bug Fixes

* bump cocreate dependency versions ([4126d7d](https://github.com/CoCreate-app/CoCreate-filter/commit/4126d7d5fe89838d78a3f55258196bd2704304fd))
* bump dependencies ([c5b868d](https://github.com/CoCreate-app/CoCreate-filter/commit/c5b868d6a8d5d9622e78baecee13ef589da359a3))

# [1.23.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.22.2...v1.23.0) (2023-09-19)


### Features

* Update CoCreate dependencies to their latest versions ([9b78889](https://github.com/CoCreate-app/CoCreate-filter/commit/9b78889df1f22775193e822b677a251200ad08d8))

## [1.22.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.22.1...v1.22.2) (2023-09-18)


### Bug Fixes

*  Add path and pathname ([bae3ee1](https://github.com/CoCreate-app/CoCreate-filter/commit/bae3ee15262f803bd7f31c53fbfb95b6c4ddade2))
* Update CoCreate depndencies to latest versions ([26e1b7d](https://github.com/CoCreate-app/CoCreate-filter/commit/26e1b7d66d3248f4422b1f959be45666c65ade0e))

## [1.22.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.22.0...v1.22.1) (2023-08-21)


### Bug Fixes

* bump dependencies ([783f76f](https://github.com/CoCreate-app/CoCreate-filter/commit/783f76f758a22ab76913f82848dc8d68a68fe4c6))

# [1.22.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.21.1...v1.22.0) (2023-08-21)


### Features

* Update cocreate dependencies for the latest features and bug fixes ([e3532c5](https://github.com/CoCreate-app/CoCreate-filter/commit/e3532c597e31a2e9c1466477ee7fd8245fb579fa))

## [1.21.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.21.0...v1.21.1) (2023-08-21)


### Bug Fixes

* /dist/CoCreate.js updated to https://CoCreate.app/dist/CoCreate.js ([e39e736](https://github.com/CoCreate-app/CoCreate-filter/commit/e39e7362ba129a8fa173dc9630df20aaecee30e5))
* replace cdn with /dist ([661b24c](https://github.com/CoCreate-app/CoCreate-filter/commit/661b24c77e620857a61e1a78700d4ceaef793f19))
* update file uploader ([3af36d6](https://github.com/CoCreate-app/CoCreate-filter/commit/3af36d6e2d420a24df672cbdb1491d8524df5ca4))

# [1.21.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.20.0...v1.21.0) (2023-08-17)


### Features

* bump cocreate dependencies for the latest updates and features ([c885ae2](https://github.com/CoCreate-app/CoCreate-filter/commit/c885ae20579eb74443db8e54306a5d9be68d4ea8))

# [1.20.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.30...v1.20.0) (2023-08-16)


### Bug Fixes

* crud attributes renamed ([7b8bd79](https://github.com/CoCreate-app/CoCreate-filter/commit/7b8bd79343c0140e3701c32820d669a0f2204fda))
* Refactor filtering functionality - change "items" to "filters" and update related variable names throughout the code. Improve code readability. ([9bc14f4](https://github.com/CoCreate-app/CoCreate-filter/commit/9bc14f430e75e859ad6728a4afc1fb0c02709ab1))
* Refactor queryElements function to accept an object for element parameter ([4fdfdd9](https://github.com/CoCreate-app/CoCreate-filter/commit/4fdfdd9b35c8d7d7b43e9460ac1cc0d6f12b6082))
* Remove commented out code in updateFilter function ([4ff5791](https://github.com/CoCreate-app/CoCreate-filter/commit/4ff57913ca91b92115fa35ab88dc28c1f01c94f4))
* removed functions for exporting and importing data, it has been replaced with @cocreate/files. ([1346487](https://github.com/CoCreate-app/CoCreate-filter/commit/13464870502d6bbd16fa23d7a958568990e8e87f))
* replace -target -selector ([c0f94bb](https://github.com/CoCreate-app/CoCreate-filter/commit/c0f94bb260dd1fd4f4721bf0e7a713a2539295fe))
* Update render attribute in index.html ([ab04430](https://github.com/CoCreate-app/CoCreate-filter/commit/ab04430ae6062fda071b48cb83a02f4e86615d63))
* updated actions callback data object ([b04c2b3](https://github.com/CoCreate-app/CoCreate-filter/commit/b04c2b3e8f286c153697873176e5081f7c97aeab))
* updated fetch-limit to filter-limit ([2d6ecfd](https://github.com/CoCreate-app/CoCreate-filter/commit/2d6ecfda88415661edc66ad338b4ffff4800d451))
* updated fetch-type to filter-on ([17343cb](https://github.com/CoCreate-app/CoCreate-filter/commit/17343cbcc2f00abd78931fc11f7280844c2b5d38))
* webpack.config and package.json make use of mode=production instead of process.env ([2b586b6](https://github.com/CoCreate-app/CoCreate-filter/commit/2b586b620d847aeb641a181b2fed618bd57ef724))


### Features

* Add support for [filter-limit] ([531a9c6](https://github.com/CoCreate-app/CoCreate-filter/commit/531a9c665f30c1dae00578fcb18158395d0c4aa8))
* filter refactored to return a filter object rather than a data object. Performance and maintainability improvements ([621c9c0](https://github.com/CoCreate-app/CoCreate-filter/commit/621c9c047ee4615da8249a51e39c9985d1fbd17c))
* name attribute and variable renamed to key ([3e6355e](https://github.com/CoCreate-app/CoCreate-filter/commit/3e6355eba74e0fddde35a4db70f308c069a655bd))
* Refactor filter initialization crud.getObject is now used to return a crud object from a specified element and filter is responsible for generating the filter object and item configuration ([a842180](https://github.com/CoCreate-app/CoCreate-filter/commit/a84218047e98e6829a53c70f46a10d129b730def))
* Refactor filter selector and element initialization process ([7003e70](https://github.com/CoCreate-app/CoCreate-filter/commit/7003e7069faae9611fe62574a201662eaae9e188))
* Refactor to support selector, closest, parent, next, previous ([6c31437](https://github.com/CoCreate-app/CoCreate-filter/commit/6c314372a8f2115f26886972e2cc34358634616a))
* update template_id to render-selector attribute. update filter attributes to filter selector-attributes ([82068b3](https://github.com/CoCreate-app/CoCreate-filter/commit/82068b3d2eef2a4f2a4714015cb6b0d24f4170be))

## [1.19.30](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.29...v1.19.30) (2023-06-14)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([ee46a0e](https://github.com/CoCreate-app/CoCreate-filter/commit/ee46a0e570d6e534018ae4920c8d27e51f69ec17))

## [1.19.29](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.28...v1.19.29) (2023-06-11)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([c521c04](https://github.com/CoCreate-app/CoCreate-filter/commit/c521c04e84019a9e72dd37edae11ca05a234c051))

## [1.19.28](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.27...v1.19.28) (2023-06-11)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([9af65bc](https://github.com/CoCreate-app/CoCreate-filter/commit/9af65bc9b156657e9b419a3c79db6f6d366e9ffc))

## [1.19.27](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.26...v1.19.27) (2023-06-11)


### Bug Fixes

* testing workflow ([6c28065](https://github.com/CoCreate-app/CoCreate-filter/commit/6c28065076b89700311c33893fe6b4940c724cb0))

## [1.19.26](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.25...v1.19.26) (2023-06-11)


### Bug Fixes

* testing workflow ([f11ae07](https://github.com/CoCreate-app/CoCreate-filter/commit/f11ae07bc9e64b4a0599c85d1d7a5695e52c87de))

## [1.19.25](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.24...v1.19.25) (2023-06-11)


### Bug Fixes

* testing workflow ([4e27fe2](https://github.com/CoCreate-app/CoCreate-filter/commit/4e27fe21c13ef84470956f1d6b8f0ba29a59f7f8))
* testing workflow ([9fee229](https://github.com/CoCreate-app/CoCreate-filter/commit/9fee2291c1c0ad3fd88b27c08f27779ac4e58065))

## [1.19.24](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.23...v1.19.24) (2023-06-11)


### Bug Fixes

* testing workflow ([fd2a920](https://github.com/CoCreate-app/CoCreate-filter/commit/fd2a920365a5410db4954fd7b7e787ea818b39a1))

## [1.19.23](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.22...v1.19.23) (2023-06-11)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([cc20de3](https://github.com/CoCreate-app/CoCreate-filter/commit/cc20de3fabead8b9877021ab7744ac85c48ec4fb))

## [1.19.22](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.21...v1.19.22) (2023-06-11)


### Bug Fixes

* postintall error ([f7094a3](https://github.com/CoCreate-app/CoCreate-filter/commit/f7094a3810a51f4a6da761c75250f2c69e98f171))

## [1.19.21](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.20...v1.19.21) (2023-06-11)


### Bug Fixes

* @cocreate/cli moved to dependencies ([733cb51](https://github.com/CoCreate-app/CoCreate-filter/commit/733cb51a3403d84ede4b24610afaf0ffabbc7650))

## [1.19.20](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.19...v1.19.20) (2023-06-11)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([93c9454](https://github.com/CoCreate-app/CoCreate-filter/commit/93c9454bfad0754b91d00c18e9f0b8e7122c5e46))

## [1.19.19](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.18...v1.19.19) (2023-06-11)


### Bug Fixes

* renamed db to storage ([b9f7113](https://github.com/CoCreate-app/CoCreate-filter/commit/b9f71133f230e1d43de3b6eb4bc56b0df885be27))
* renamed hosts to host. the value can be a string or an array of strings ([84b50bc](https://github.com/CoCreate-app/CoCreate-filter/commit/84b50bcb904ab52f8b039d92fb0705f0cb5e3f67))

## [1.19.18](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.17...v1.19.18) (2023-06-10)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([a9e66b4](https://github.com/CoCreate-app/CoCreate-filter/commit/a9e66b43e52ca67580e490d99bea9bf6ac5d04a3))

## [1.19.17](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.16...v1.19.17) (2023-06-10)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([32ef3ff](https://github.com/CoCreate-app/CoCreate-filter/commit/32ef3ff7ed21b6c376abe2a081dc443b5cb14c78))

## [1.19.16](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.15...v1.19.16) (2023-06-04)


### Bug Fixes

* Refactor CoCreate.config.js to remove hard-coded credentials ([0f135e5](https://github.com/CoCreate-app/CoCreate-filter/commit/0f135e50f4cff9bcbab996eb7300d1e1d6eeab24))

## [1.19.15](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.14...v1.19.15) (2023-06-04)


### Bug Fixes

* replaced secert GITHUB_TOKEN with GITHUB ([264948b](https://github.com/CoCreate-app/CoCreate-filter/commit/264948b4d7dd6954f9db56156e33b4042ea31426))
* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([0d482a3](https://github.com/CoCreate-app/CoCreate-filter/commit/0d482a3b8c03ab6cd1d8d03f0290ed33d374fdac))

## [1.19.14](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.13...v1.19.14) (2023-06-04)


### Bug Fixes

* **semantic-release:** worklow error solved by running node version 14 ([5ae6a2b](https://github.com/CoCreate-app/CoCreate-filter/commit/5ae6a2b1c33fe5752dcffced9e87115074fd71d5))

## [1.19.13](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.12...v1.19.13) (2023-06-02)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([696c5fe](https://github.com/CoCreate-app/CoCreate-filter/commit/696c5fecd752d205faa44eb729b7f5d27d9294c7))

## [1.19.12](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.11...v1.19.12) (2023-05-21)


### Bug Fixes

* Update dependencies versions for [@cocreate](https://github.com/cocreate) libraries ([980a839](https://github.com/CoCreate-app/CoCreate-filter/commit/980a839abe175fa38ace18d23255d0c4b1210e84))

## [1.19.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.10...v1.19.11) (2023-05-19)


### Bug Fixes

* update packages to latest version. This commit updates various packages in the dependencies section of the package.json file to their latest published versions, thereby fixing multiple bugs and improving overall performance. ([0f364fc](https://github.com/CoCreate-app/CoCreate-filter/commit/0f364fc4a4ee8f928da51b3ef5b163bb652d4853))

## [1.19.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.9...v1.19.10) (2023-05-10)


### Bug Fixes

* apikey renamed to key ([c5758e5](https://github.com/CoCreate-app/CoCreate-filter/commit/c5758e514c507577bb9505d0e1b6641b07be6b8a))

## [1.19.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.8...v1.19.9) (2023-05-06)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([8690c29](https://github.com/CoCreate-app/CoCreate-filter/commit/8690c295d7a0d2f93675d30e0528661be6f0e86d))
* filter-sort icon ([85fdef2](https://github.com/CoCreate-app/CoCreate-filter/commit/85fdef26bd27301562866ba7b79d62949381bafd))

## [1.19.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.7...v1.19.8) (2023-05-01)


### Bug Fixes

* replaced icon toggles with new svg ([15d8d81](https://github.com/CoCreate-app/CoCreate-filter/commit/15d8d8187b87c112db41a353efaf3660e989a1a8))

## [1.19.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.6...v1.19.7) (2023-05-01)


### Bug Fixes

* update manifest.json to manifest.webmanifest ([805046e](https://github.com/CoCreate-app/CoCreate-filter/commit/805046ebc5459afb74615e3cf5db20327a9304af))

## [1.19.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.5...v1.19.6) (2023-05-01)


### Bug Fixes

* replace fontawesome with svg ([718d2ad](https://github.com/CoCreate-app/CoCreate-filter/commit/718d2ada3b94087f6b1adfa02e5081129c910a7d))

## [1.19.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.4...v1.19.5) (2023-04-30)


### Bug Fixes

* fullscreen target updated to fullscreen fullscreen-target ([ea5a034](https://github.com/CoCreate-app/CoCreate-filter/commit/ea5a034127acc9911237ef0582ca241bf4fce64a))
* package-lock.json and pnpm-lock.yaml added to .gitignore ([6adced0](https://github.com/CoCreate-app/CoCreate-filter/commit/6adced0ad80b3d50dc9f583b5c84d42c869f2e51))
* removed toogle fullscreen icons. now using css content ([59b5b6b](https://github.com/CoCreate-app/CoCreate-filter/commit/59b5b6b5ac9cc6addcff5cf0ea98d969c04ab29a))

## [1.19.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.3...v1.19.4) (2023-04-24)


### Bug Fixes

* updated worrkflows to v3 and node version 16 ([851a755](https://github.com/CoCreate-app/CoCreate-filter/commit/851a755d9bf1b49698bec9a334959962aff5e6f3))

## [1.19.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.2...v1.19.3) (2023-04-24)


### Bug Fixes

* workflow node version updated  16 ([ab9bfbb](https://github.com/CoCreate-app/CoCreate-filter/commit/ab9bfbb3277962f0e38696554ba78a78e33ba5f2))

## [1.19.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.1...v1.19.2) (2023-04-24)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([e33c486](https://github.com/CoCreate-app/CoCreate-filter/commit/e33c4860bdfb21d4df8d5befc85536f69980becb))

## [1.19.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.19.0...v1.19.1) (2023-04-24)


### Bug Fixes

* removed uglifyjs-webpack-plugin ([dea4cc5](https://github.com/CoCreate-app/CoCreate-filter/commit/dea4cc535c167da7ed32a50169c2452a03f1f4ff))

# [1.19.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.7...v1.19.0) (2023-04-24)


### Features

* added pwa manifest ([b4d5f56](https://github.com/CoCreate-app/CoCreate-filter/commit/b4d5f569a6c10f03d9515a46944297c1a1ae1811))

## [1.18.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.6...v1.18.7) (2023-04-11)


### Bug Fixes

* bump dependencies ([7ba4ecb](https://github.com/CoCreate-app/CoCreate-filter/commit/7ba4ecb4535a9184f4da5840844e31925cea9e67))

## [1.18.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.5...v1.18.6) (2023-04-11)


### Bug Fixes

*  bump [@cocreate](https://github.com/cocreate) dependencies ([b017eae](https://github.com/CoCreate-app/CoCreate-filter/commit/b017eae132b84831c2d39fb33fe1564ab9c33d3a))

## [1.18.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.4...v1.18.5) (2023-04-11)


### Bug Fixes

* renamed domains to hosts ([c251137](https://github.com/CoCreate-app/CoCreate-filter/commit/c2511372a258e216498c9a36ec54e86d4e63a14f))

## [1.18.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.3...v1.18.4) (2023-03-30)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies' ([2b24b0d](https://github.com/CoCreate-app/CoCreate-filter/commit/2b24b0d54a8953ece9a28943ee135792c5c8d5e4))

## [1.18.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.2...v1.18.3) (2023-03-16)


### Bug Fixes

* bump dependencies' ([2a7b5c6](https://github.com/CoCreate-app/CoCreate-filter/commit/2a7b5c6cd4cf0e60b4c65ca68330c43afa978b6d))

## [1.18.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.1...v1.18.2) (2023-03-16)


### Bug Fixes

* filter-sort-direction ([00c9f02](https://github.com/CoCreate-app/CoCreate-filter/commit/00c9f023f315b800ef8572dfee8a716e571b9977))
* sort bug ([647c4a6](https://github.com/CoCreate-app/CoCreate-filter/commit/647c4a6b98dbffd5cedfd252b524fecb0700f3e9))

## [1.18.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.18.0...v1.18.1) (2023-03-16)


### Bug Fixes

* bump dependencies' ([3f35f6c](https://github.com/CoCreate-app/CoCreate-filter/commit/3f35f6cd86ec1d9066c11cdb52c25430fcba8ecc))

# [1.18.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.17.3...v1.18.0) (2023-03-16)


### Features

* replaced get-value and set-value with a super charged version of CoCreate-events ([a1c0000](https://github.com/CoCreate-app/CoCreate-filter/commit/a1c0000ac029bcaa880cb643ab9dc4559c45bcc2))

## [1.17.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.17.2...v1.17.3) (2023-02-01)


### Bug Fixes

* bump dependencies ([5370f4d](https://github.com/CoCreate-app/CoCreate-filter/commit/5370f4d99feaba67b2427e6de470e29903c1d81d))

## [1.17.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.17.1...v1.17.2) (2023-02-01)


### Bug Fixes

* bump dependencies ([bd43ef3](https://github.com/CoCreate-app/CoCreate-filter/commit/bd43ef31e21c18c029098b3f83c92e3857772f67))
* getSearch matches operator and caseSensitive ([9cac8ed](https://github.com/CoCreate-app/CoCreate-filter/commit/9cac8edf0585876d155306c4ac4b8bd2b7c86731))

## [1.17.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.17.0...v1.17.1) (2023-01-31)


### Bug Fixes

* bump dependencies ([9e748f6](https://github.com/CoCreate-app/CoCreate-filter/commit/9e748f62b7b1d32acabebb0902aa73067afc155f))

# [1.17.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.16.3...v1.17.0) (2023-01-31)


### Bug Fixes

* bump crud depedency ([c0b48a7](https://github.com/CoCreate-app/CoCreate-filter/commit/c0b48a781a79da6f8a394ae4df0997fc96cc7d4c))


### Features

* filter.query caseSensitive support ([ab81769](https://github.com/CoCreate-app/CoCreate-filter/commit/ab8176918ee0fbe717ffde9e6aad3248f88d5892))

## [1.16.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.16.2...v1.16.3) (2023-01-30)


### Bug Fixes

* bump dependencies ([33e2c0b](https://github.com/CoCreate-app/CoCreate-filter/commit/33e2c0b46cccfc11f4f2cd3a4dd98bfb9196e950))

## [1.16.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.16.1...v1.16.2) (2023-01-29)


### Bug Fixes

* bump dependencies ([98ef2e0](https://github.com/CoCreate-app/CoCreate-filter/commit/98ef2e024c84e3dcffcc96110757657f71e5631b))

## [1.16.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.16.0...v1.16.1) (2023-01-29)


### Bug Fixes

* bump dependencies ([5b21a01](https://github.com/CoCreate-app/CoCreate-filter/commit/5b21a01ac2c229b669069c9bb8c660988668488a))

# [1.16.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.15.2...v1.16.0) (2023-01-29)


### Features

* filter.type data ([44ad996](https://github.com/CoCreate-app/CoCreate-filter/commit/44ad99644f4068b714b8551ba9869b613c7fef55))

## [1.15.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.15.1...v1.15.2) (2023-01-28)


### Bug Fixes

* add crud import ([efdaa74](https://github.com/CoCreate-app/CoCreate-filter/commit/efdaa74d1f60ca4720eaa88d771a7b073887bdd5))
* bump crud-client ([b9a18dc](https://github.com/CoCreate-app/CoCreate-filter/commit/b9a18dcfc574e6034f5be0f28be7175c43e4af2c))
* import crud ([f5ed30e](https://github.com/CoCreate-app/CoCreate-filter/commit/f5ed30eba8ffa952cefd944cfbe0b8635bd12cb7))

## [1.15.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.15.0...v1.15.1) (2023-01-27)


### Bug Fixes

* CoCreate && CoCreate.crud ([9043a57](https://github.com/CoCreate-app/CoCreate-filter/commit/9043a57fb12004f02f86b31c67b7e9f6e83e78a8))

# [1.15.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.9...v1.15.0) (2023-01-27)


### Bug Fixes

* bump dependencies ([e99ddcc](https://github.com/CoCreate-app/CoCreate-filter/commit/e99ddcc054fbba1932b5de0954aada97fe8e23ea))


### Features

* crud is optional and accessed using CoCreate.crud ([1fdb8f0](https://github.com/CoCreate-app/CoCreate-filter/commit/1fdb8f0eb57a45228f48201dcac4705cfd9a6bd9))

## [1.14.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.8...v1.14.9) (2023-01-13)


### Bug Fixes

* bump dependencies ([451cac9](https://github.com/CoCreate-app/CoCreate-filter/commit/451cac94223fbfd749e4a0bd77cdcaa403df4683))

## [1.14.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.7...v1.14.8) (2023-01-13)


### Bug Fixes

* bump dependencies ([21593c2](https://github.com/CoCreate-app/CoCreate-filter/commit/21593c2684169e11d7dfe8a6555b57bad7edb6e9))

## [1.14.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.6...v1.14.7) (2023-01-10)


### Bug Fixes

* bump dependencies ([30d6be1](https://github.com/CoCreate-app/CoCreate-filter/commit/30d6be19c6e58074a7319c19a88cd47c75f6272b))

## [1.14.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.5...v1.14.6) (2023-01-10)


### Bug Fixes

* bump @cocreate/element-prototype ([8c33ece](https://github.com/CoCreate-app/CoCreate-filter/commit/8c33ece2a4a6905526e155756ef7a7982cfd667f))
* test sortName and sortDirection for template braces if found return ([28303a4](https://github.com/CoCreate-app/CoCreate-filter/commit/28303a48fe2fbd11e509a0c9d28bb680ad7397c7))

## [1.14.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.4...v1.14.5) (2023-01-09)


### Bug Fixes

* bump dependnecies ([3a7db54](https://github.com/CoCreate-app/CoCreate-filter/commit/3a7db546bd3de99594c0202dd13802d9c734626f))

## [1.14.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.3...v1.14.4) (2023-01-09)


### Bug Fixes

* bump dependnecies ([b8ead4b](https://github.com/CoCreate-app/CoCreate-filter/commit/b8ead4bdbd2d0af7d6ad79e8c134a0d302eb4514))
* filter.getValue if el.value not undefined ([8d56407](https://github.com/CoCreate-app/CoCreate-filter/commit/8d56407c318c40493453a5584a4889c3431172a1))
* if getQuery index is null and value is empty string return ([b4c798c](https://github.com/CoCreate-app/CoCreate-filter/commit/b4c798ce9a35c1fd003b35b39b610a4e1d1d3cb3))

## [1.14.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.2...v1.14.3) (2023-01-06)


### Bug Fixes

* bump dependencies, worklow [@v3](https://github.com/v3) ([e6c547b](https://github.com/CoCreate-app/CoCreate-filter/commit/e6c547b03823d6acf3f9d8a6b357e93ace60f97b))

## [1.14.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.1...v1.14.2) (2023-01-05)


### Bug Fixes

* bump dependencies ([5046d84](https://github.com/CoCreate-app/CoCreate-filter/commit/5046d847c0364d08926943e11e1ab10d08e56ee0))

## [1.14.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.14.0...v1.14.1) (2023-01-05)


### Bug Fixes

* bump cdn to 1.39.4 ([8a48f07](https://github.com/CoCreate-app/CoCreate-filter/commit/8a48f070a6f8de93022900aa2b544fcb4887e777))
* bump dependencies ([525d406](https://github.com/CoCreate-app/CoCreate-filter/commit/525d4066d85ea9b811005526230eef333e25e124))

# [1.14.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.24...v1.14.0) (2023-01-02)


### Features

* class="template" template_id="id" replaced with template="id" ([c3f84e3](https://github.com/CoCreate-app/CoCreate-filter/commit/c3f84e30e55d73ab113a3ccfde53540a9d968e1b))

## [1.13.24](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.23...v1.13.24) (2023-01-01)


### Bug Fixes

* docs sanbox overflow ([be52742](https://github.com/CoCreate-app/CoCreate-filter/commit/be5274288b3b87c2e68abf69a736f63957c0fd0b))

## [1.13.23](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.22...v1.13.23) (2022-12-31)


### Bug Fixes

* bump dependencies ([8f9e094](https://github.com/CoCreate-app/CoCreate-filter/commit/8f9e094654167826e6be5860abcaf2697924eb39))

## [1.13.22](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.21...v1.13.22) (2022-12-31)


### Bug Fixes

* add @cocreate/element-prototype ([c13312f](https://github.com/CoCreate-app/CoCreate-filter/commit/c13312f3849796dff42a6e9a66cce1413289e2ca))
* delete item.isFIlter if filter.init ([64a3073](https://github.com/CoCreate-app/CoCreate-filter/commit/64a3073b038749910b2cc5175a62b49a9f01df70))

## [1.13.21](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.20...v1.13.21) (2022-12-30)


### Bug Fixes

* update config sources to use template  braces with entry on src ([bbeeff3](https://github.com/CoCreate-app/CoCreate-filter/commit/bbeeff3b307a71da4afc94aff4bcfac3edfb3d9c))

## [1.13.20](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.19...v1.13.20) (2022-12-29)


### Bug Fixes

* bump dependencies ([42e68c1](https://github.com/CoCreate-app/CoCreate-filter/commit/42e68c1a5b612e8670a7db466fff6f105bab4c90))

## [1.13.19](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.18...v1.13.19) (2022-12-29)


### Bug Fixes

* bump dependencies ([8913d0e](https://github.com/CoCreate-app/CoCreate-filter/commit/8913d0e05603fcc6504fc9ff7c694d3a7ab0b1a2))

## [1.13.18](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.17...v1.13.18) (2022-12-27)


### Bug Fixes

* bump dependecies ([3315ea3](https://github.com/CoCreate-app/CoCreate-filter/commit/3315ea343f2e1d0f45243d2edb6cbb613cfbfd87))

## [1.13.17](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.16...v1.13.17) (2022-12-27)


### Bug Fixes

* bump dependencies ([fb18e09](https://github.com/CoCreate-app/CoCreate-filter/commit/fb18e09009d66ffe0f86edd1c5928a8f337659bd))

## [1.13.16](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.15...v1.13.16) (2022-12-27)


### Bug Fixes

* bump dependencies ([d24d63b](https://github.com/CoCreate-app/CoCreate-filter/commit/d24d63b8f0e5e189478485f9b7c258d554b11fe0))
* init resets all filter, performance improvement for filter events ([5ce3d62](https://github.com/CoCreate-app/CoCreate-filter/commit/5ce3d628dea9bc403445e1bc14407d027a83ab10))

## [1.13.15](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.14...v1.13.15) (2022-12-25)


### Bug Fixes

* bump dependencies ([32d0ab7](https://github.com/CoCreate-app/CoCreate-filter/commit/32d0ab7c94d28802418f623eaf062b828d41f5c2))

## [1.13.14](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.13...v1.13.14) (2022-12-25)


### Bug Fixes

* bump dependencies ([c14b727](https://github.com/CoCreate-app/CoCreate-filter/commit/c14b727a3757fd65e5bba3d0eb58ef8a2ac6b408))
* bumpcdn to 1.34.4 ([4d14cbb](https://github.com/CoCreate-app/CoCreate-filter/commit/4d14cbb2ea739a22f554a773b457026ae0502ed3))
* formating ([8126a24](https://github.com/CoCreate-app/CoCreate-filter/commit/8126a24c458aca24d45d453225425aeb62edded3))
* type="modal" and pass_to updated to action="pass, openModal" ([009f8b4](https://github.com/CoCreate-app/CoCreate-filter/commit/009f8b44dc7109426ba8b5437d0c4f71b91b7f09))

## [1.13.13](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.12...v1.13.13) (2022-12-23)


### Bug Fixes

* bump dependnecies ([bac30b1](https://github.com/CoCreate-app/CoCreate-filter/commit/bac30b13eac428445a04160eb25e1a1aceff91ba))

## [1.13.12](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.11...v1.13.12) (2022-12-23)


### Bug Fixes

* observer callback require self instanc ([6cea505](https://github.com/CoCreate-app/CoCreate-filter/commit/6cea505186cc7d73d62d33f0612aeece6fc8d76e))

## [1.13.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.10...v1.13.11) (2022-12-22)


### Bug Fixes

* bump dependencies ([9977441](https://github.com/CoCreate-app/CoCreate-filter/commit/99774415f33848237618568c97f3e820faf6bba0))
* update cdn ([de3fde2](https://github.com/CoCreate-app/CoCreate-filter/commit/de3fde28bccd6d705b64a259301fae9bae0463f5))

## [1.13.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.9...v1.13.10) (2022-12-22)


### Bug Fixes

* update demos and bump dependencies ([9f4fb0b](https://github.com/CoCreate-app/CoCreate-filter/commit/9f4fb0b7e9fe21d121bec3f2d72db9891d47a12d))

## [1.13.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.8...v1.13.9) (2022-12-22)


### Bug Fixes

* filter-search getAttribute update to hasAttribute to support empty attribute va;ue ([e10477b](https://github.com/CoCreate-app/CoCreate-filter/commit/e10477bcf5b027bb933a21d284960b2cdeb5aa77))

## [1.13.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.7...v1.13.8) (2022-12-21)


### Bug Fixes

* bump dependencies ([def06d5](https://github.com/CoCreate-app/CoCreate-filter/commit/def06d5fe3ecbdd1303961db2e4f485b4efc3b39))

## [1.13.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.6...v1.13.7) (2022-12-21)


### Bug Fixes

* bump dependencies ([85faebf](https://github.com/CoCreate-app/CoCreate-filter/commit/85faebf12676fc9991409d3121ad998147b7b8b1))

## [1.13.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.5...v1.13.6) (2022-12-20)


### Bug Fixes

* bump dependencies ([edb41d2](https://github.com/CoCreate-app/CoCreate-filter/commit/edb41d20b5e7afedacb8c8ea87e025a9792ece75))

## [1.13.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.4...v1.13.5) (2022-12-15)


### Bug Fixes

* add missing dev dependency style-loader ([3f8482b](https://github.com/CoCreate-app/CoCreate-filter/commit/3f8482b4bcf39c7b22bd3608f1a94a995d54e140))

## [1.13.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.3...v1.13.4) (2022-12-15)


### Bug Fixes

* isFlter typo item.isfilter ([6a23c20](https://github.com/CoCreate-app/CoCreate-filter/commit/6a23c20ec1302433d913fd8f654ff389f89d69d3))

## [1.13.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.2...v1.13.3) (2022-12-14)


### Bug Fixes

* filter-sort-toggle ([b314223](https://github.com/CoCreate-app/CoCreate-filter/commit/b314223da5293d31054b85910cea386d6c7befce))

## [1.13.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.1...v1.13.2) (2022-12-13)


### Bug Fixes

* removed un used devDependencies ([ebb2601](https://github.com/CoCreate-app/CoCreate-filter/commit/ebb2601c77a996f996886fa6fed31058f4c26c37))

## [1.13.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.13.0...v1.13.1) (2022-12-13)


### Bug Fixes

* bump dependencies ([d1c5ea0](https://github.com/CoCreate-app/CoCreate-filter/commit/d1c5ea08d94dedd823ddd626f75f92710d1328bc))

# [1.13.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.13...v1.13.0) (2022-12-13)


### Bug Fixes

* bump dependencies ([9ccc06b](https://github.com/CoCreate-app/CoCreate-filter/commit/9ccc06b1020d2704fcaafaaeaf142c9f0d462773))
* filter perator include and $include ([3a2b5a8](https://github.com/CoCreate-app/CoCreate-filter/commit/3a2b5a80df5cdf4b88ceb67ea609b193380dbc68))


### Features

* filter items accepts an option called compare. if true will check if filter has changed ([c758115](https://github.com/CoCreate-app/CoCreate-filter/commit/c7581154d71e6c25ad570e2b6316f936852470d7))

## [1.12.13](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.12...v1.12.13) (2022-12-12)


### Bug Fixes

* bump dependencies ([3874d75](https://github.com/CoCreate-app/CoCreate-filter/commit/3874d751b76623bbfe123ace08eaeba747ca1beb))

## [1.12.12](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.11...v1.12.12) (2022-12-12)


### Bug Fixes

* bump @cocreate/crud-client ([3ec6d36](https://github.com/CoCreate-app/CoCreate-filter/commit/3ec6d36ee183821864168470467631b43034d928))

## [1.12.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.10...v1.12.11) (2022-12-12)


### Bug Fixes

* bump @cocreate/crud-client ([486dfc1](https://github.com/CoCreate-app/CoCreate-filter/commit/486dfc118585693dfa93036dcc1abbf5b974bba8))

## [1.12.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.9...v1.12.10) (2022-12-11)


### Bug Fixes

* bump dependencies ([e90b719](https://github.com/CoCreate-app/CoCreate-filter/commit/e90b719d534e8879874fb728fb0f202bda21184d))

## [1.12.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.8...v1.12.9) (2022-12-11)


### Bug Fixes

* bump dependencies ([52dbf5d](https://github.com/CoCreate-app/CoCreate-filter/commit/52dbf5d26fc9e7d5ee1dc3d7f3a8900113294961))
* filter.init requires startIndex to be set or rest to 0 ([1cc1a90](https://github.com/CoCreate-app/CoCreate-filter/commit/1cc1a900754bab14e9cf7f3921a40459fa2de356))

## [1.12.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.7...v1.12.8) (2022-12-09)


### Bug Fixes

* bump dependencies ([09c65de](https://github.com/CoCreate-app/CoCreate-filter/commit/09c65deaf36fddc55e86afb7d695b589d07945c0))

## [1.12.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.6...v1.12.7) (2022-12-08)


### Bug Fixes

* bump dependencies ([a6b4314](https://github.com/CoCreate-app/CoCreate-filter/commit/a6b4314dd111ac873639defb2e1c601a0b1d9ba6))

## [1.12.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.5...v1.12.6) (2022-12-08)


### Bug Fixes

* bump @cocreate/crud-client ([7f00020](https://github.com/CoCreate-app/CoCreate-filter/commit/7f000209be14faf8e03338afa4a3b2e42e83b693))

## [1.12.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.4...v1.12.5) (2022-12-07)


### Bug Fixes

* bump dependencies ([df3af88](https://github.com/CoCreate-app/CoCreate-filter/commit/df3af881ad098ee60eecc1958396f3494bf006f8))

## [1.12.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.3...v1.12.4) (2022-12-07)


### Bug Fixes

* bump @cocreate/crud=client ([3597c76](https://github.com/CoCreate-app/CoCreate-filter/commit/3597c76f4d6b5458b514df3454d20e375e6d6f8f))

## [1.12.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.2...v1.12.3) (2022-12-04)


### Bug Fixes

* bump dependencies ([21612c1](https://github.com/CoCreate-app/CoCreate-filter/commit/21612c15af51b48cb8e16000c2f2745fb392d094))

## [1.12.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.1...v1.12.2) (2022-12-04)


### Bug Fixes

* bump @cocreate/crud-client ([3fdda5a](https://github.com/CoCreate-app/CoCreate-filter/commit/3fdda5afe868c1b4c27cf5502e18d819ddcfc520))
* reduced queries ([50dc0c6](https://github.com/CoCreate-app/CoCreate-filter/commit/50dc0c6207ff7edf243d0b55429dd72e0277bbfb))

## [1.12.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.12.0...v1.12.1) (2022-12-02)


### Bug Fixes

* bump dependencies ([7dfeac3](https://github.com/CoCreate-app/CoCreate-filter/commit/7dfeac38b75f470893295dddf452775f09f07438))
* docs ([a286c3d](https://github.com/CoCreate-app/CoCreate-filter/commit/a286c3d62771e555ad70686f7fa719743e6e33a4))

# [1.12.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.7...v1.12.0) (2022-12-02)


### Bug Fixes

* bump dependencies ([6c0dd13](https://github.com/CoCreate-app/CoCreate-filter/commit/6c0dd1364df398f46cb111ac022cda9d540db36f))


### Features

* filter-logical-operator to define and | or for various filter elements ([585d1ed](https://github.com/CoCreate-app/CoCreate-filter/commit/585d1edafd1cebc8505cdb2dc0a247451b08405e))
* filter.search is an array of searches. renames sort.type to sort direction, return fetch false if fetch-<attribute> value is a template {{}} ([cfef7d0](https://github.com/CoCreate-app/CoCreate-filter/commit/cfef7d09f556be8fed59a638acc75b1c1e82d816))

## [1.11.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.6...v1.11.7) (2022-11-28)


### Bug Fixes

* bump dependencies ([db58106](https://github.com/CoCreate-app/CoCreate-filter/commit/db58106b81726c40bfe2248701cbd9e95555f570))

## [1.11.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.5...v1.11.6) (2022-11-28)


### Bug Fixes

* search if condition ([7090742](https://github.com/CoCreate-app/CoCreate-filter/commit/7090742872a258519ad956d84e8af0b2b4235d15))

## [1.11.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.4...v1.11.5) (2022-11-28)


### Bug Fixes

* bump dependencies ([c825108](https://github.com/CoCreate-app/CoCreate-filter/commit/c825108d4160cc0ba9cc55018ad444019a4e5ef3))

## [1.11.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.3...v1.11.4) (2022-11-28)


### Bug Fixes

* bump @cocreate/crud-client ([ff96936](https://github.com/CoCreate-app/CoCreate-filter/commit/ff96936e13271e0cadae13dde35e4388d5f7a17f))

## [1.11.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.2...v1.11.3) (2022-11-27)


### Bug Fixes

* bump dependencies ([a464a3c](https://github.com/CoCreate-app/CoCreate-filter/commit/a464a3c2461e53cfcb4a6917e0ca398c34985fa2))

## [1.11.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.1...v1.11.2) (2022-11-27)


### Bug Fixes

* bump dependencies ([bfb896a](https://github.com/CoCreate-app/CoCreate-filter/commit/bfb896a2f7ae196f24eef1b4bf38153c2fe50bc4))

## [1.11.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.11.0...v1.11.1) (2022-11-26)


### Bug Fixes

* bump dependencies ([a603f7f](https://github.com/CoCreate-app/CoCreate-filter/commit/a603f7ff592cbd7dc776b5d627fe3cdfd83cbb5c))

# [1.11.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.5...v1.11.0) (2022-11-26)


### Features

* export as JSON, loadmore on scroll or btn ([18fb87f](https://github.com/CoCreate-app/CoCreate-filter/commit/18fb87f05c247a32a250e4f869e50d9841436755))

## [1.10.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.4...v1.10.5) (2022-11-25)


### Bug Fixes

* bump @cocreate/crud-client ([f46c11f](https://github.com/CoCreate-app/CoCreate-filter/commit/f46c11f51730ffd3ce14c5267bdd5d7d497d9cf0))

## [1.10.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.3...v1.10.4) (2022-11-25)


### Bug Fixes

* bump dependencies ([8a2b481](https://github.com/CoCreate-app/CoCreate-filter/commit/8a2b481aec7f609bcac44d6df025697353ec5752))
* CoCreate.crud.default removed bug causing default object ([b8b7524](https://github.com/CoCreate-app/CoCreate-filter/commit/b8b75249393f229745cabd3df5d665b5acd1234b))

## [1.10.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.2...v1.10.3) (2022-11-24)


### Bug Fixes

* bump depenedencies ([a1b5269](https://github.com/CoCreate-app/CoCreate-filter/commit/a1b52691b7117aab4de86e4aa2faa42e5bf01f94))

## [1.10.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.1...v1.10.2) (2022-11-24)


### Bug Fixes

* bump depenedencies ([c1a3d07](https://github.com/CoCreate-app/CoCreate-filter/commit/c1a3d077a65975a195d136f86d528c5ece017587))

## [1.10.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.10.0...v1.10.1) (2022-11-23)


### Bug Fixes

* bumped [@cocreate](https://github.com/cocreate) dependencies ([0f2ae4d](https://github.com/CoCreate-app/CoCreate-filter/commit/0f2ae4d3928098205eb9d3935548ea611a2d2a80))

# [1.10.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.6...v1.10.0) (2022-11-23)


### Features

* deleteDocumentsAction now sends one message containg an array of documents ([2e2776d](https://github.com/CoCreate-app/CoCreate-filter/commit/2e2776de6fc7763928e6b957f7e19cb04eda1590))
* improved querying ([8adda10](https://github.com/CoCreate-app/CoCreate-filter/commit/8adda10d3331e63827974004b664c91aa4784d8a))

## [1.9.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.5...v1.9.6) (2022-11-22)


### Bug Fixes

* sort bug ([ac9cc61](https://github.com/CoCreate-app/CoCreate-filter/commit/ac9cc6190d0f7df5c2786a2dc5037fb33040832c))

## [1.9.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.4...v1.9.5) (2022-11-22)


### Bug Fixes

* apply src: {{source}} to CoCreate.config ([1b5d973](https://github.com/CoCreate-app/CoCreate-filter/commit/1b5d973b2b00d8402d587e806dd3eef9e0710005))
* workflow docs ([78f6f17](https://github.com/CoCreate-app/CoCreate-filter/commit/78f6f17c5c18cd3b4e9f528435f9d061af554060))

## [1.9.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.3...v1.9.4) (2022-11-21)


### Bug Fixes

* @cocreate/docs bug fix ([365ce21](https://github.com/CoCreate-app/CoCreate-filter/commit/365ce219c4437107183b3ca008574550ea81b5ab))

## [1.9.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.2...v1.9.3) (2022-11-21)


### Bug Fixes

* replaced document_id with document._id ([4cb86c2](https://github.com/CoCreate-app/CoCreate-filter/commit/4cb86c27adf20614f07627820c9ee0ade467e82f))

## [1.9.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.1...v1.9.2) (2022-11-21)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([b1800a8](https://github.com/CoCreate-app/CoCreate-filter/commit/b1800a8340378851f33639cd6ff10ce6f0e576e9))

## [1.9.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.9.0...v1.9.1) (2022-11-21)


### Bug Fixes

* bump d@cocreate ependencies ([70bd913](https://github.com/CoCreate-app/CoCreate-filter/commit/70bd91391688016ebf1283cafac623502b1d2a73))

# [1.9.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.11...v1.9.0) (2022-11-21)


### Bug Fixes

* filter-order attributes renamed to filter-sort ([82243bc](https://github.com/CoCreate-app/CoCreate-filter/commit/82243bc9a641dca94467f2ed01052b153a08eba3))
* if condition for filter.search ([635bbd4](https://github.com/CoCreate-app/CoCreate-filter/commit/635bbd4dcb116886bbaa905effe6cc96823d71c2))
* if type document or index and no collection is defined return ([441333a](https://github.com/CoCreate-app/CoCreate-filter/commit/441333acef5b027038db1b92a0c39a7b9751a177))
* if type document set item.document ([4bdf812](https://github.com/CoCreate-app/CoCreate-filter/commit/4bdf8124be3701bf0b4e78f6c94c7d58d46a6655))
* removed created_ids ([2f3111b](https://github.com/CoCreate-app/CoCreate-filter/commit/2f3111bdb89da9656dec9a017f2d996fc720f3ef))
* renamed crud.checkAttrValue to crud.checkValue ([527fa9c](https://github.com/CoCreate-app/CoCreate-filter/commit/527fa9c7bbb639dd682102f678b94e29c3ae468e))
* renamed data.data to data.document ([3d822b6](https://github.com/CoCreate-app/CoCreate-filter/commit/3d822b6f95f85da264ea0c3b07d8a09853aa1993))
* update crud functions to receive an array of objects as the response ([3541ed3](https://github.com/CoCreate-app/CoCreate-filter/commit/3541ed3c73cf52144877222a536b4a99b551a3e6))


### Features

* checkValue for {{template}} if exist return boolean fetch false to prevent components from fetching ([1805ee2](https://github.com/CoCreate-app/CoCreate-filter/commit/1805ee2bc69199321fbe90f4d44d665f152930bf))
* renamed changeFilterInput to filterData, support for fetching and rendering multiple database, collection, index and document ([5398f57](https://github.com/CoCreate-app/CoCreate-filter/commit/5398f57f72af09f5af4e8120e0ec3c67ff89fcca))
* type = document if collection is not empty ([9bc6fb7](https://github.com/CoCreate-app/CoCreate-filter/commit/9bc6fb767f0231bdaeaf5bb54d5e938a052600eb))

## [1.8.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.10...v1.8.11) (2022-10-02)


### Bug Fixes

* minor bug fixes ([72d4866](https://github.com/CoCreate-app/CoCreate-filter/commit/72d48664c684217cd70eb831817340e867cf4ae2))

## [1.8.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.9...v1.8.10) (2022-10-02)


### Bug Fixes

* bump @cocreate/hosting and @cocreate/socket-client ([a6615d9](https://github.com/CoCreate-app/CoCreate-filter/commit/a6615d9e878b5fc3dc49ba87f9907c673031cddb))
* set default operator to $contain ([d39676d](https://github.com/CoCreate-app/CoCreate-filter/commit/d39676d3bb5304f8782f8bc93dbd41994a535e1e))

## [1.8.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.8...v1.8.9) (2022-10-01)


### Bug Fixes

* bump dependencies ([90c69c7](https://github.com/CoCreate-app/CoCreate-filter/commit/90c69c73305b0f3baa3210b4cfc01a93851bd77c))

## [1.8.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.7...v1.8.8) (2022-10-01)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([fbc5f71](https://github.com/CoCreate-app/CoCreate-filter/commit/fbc5f7174fe99a85b2974fb465d36f5e6f8d08b2))

## [1.8.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.6...v1.8.7) (2022-09-30)


### Bug Fixes

* export default ([3b2061e](https://github.com/CoCreate-app/CoCreate-filter/commit/3b2061ec72657714cb698951be9231987cbba1da))

## [1.8.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.5...v1.8.6) (2022-09-30)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([cf1f54b](https://github.com/CoCreate-app/CoCreate-filter/commit/cf1f54be095aff3c9802ed3df792c820102e7b93))

## [1.8.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.4...v1.8.5) (2022-09-30)


### Bug Fixes

* bump [@cocreate](https://github.com/cocreate) dependencies ([2c031dc](https://github.com/CoCreate-app/CoCreate-filter/commit/2c031dc22697cbcdd345448881f7fc3a86397b6c))

## [1.8.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.3...v1.8.4) (2022-09-30)


### Bug Fixes

* bump dependencies ([6598033](https://github.com/CoCreate-app/CoCreate-filter/commit/659803334cbcf0b0e77263a93389d931eae34911))

## [1.8.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.2...v1.8.3) (2022-09-30)


### Bug Fixes

* bump dependencies ([3824d9a](https://github.com/CoCreate-app/CoCreate-filter/commit/3824d9a7c6142af9ec034c9d33608f4c400300a8))

## [1.8.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.1...v1.8.2) (2022-09-29)


### Bug Fixes

* config renameed to CoCreateConfig ([9687ed7](https://github.com/CoCreate-app/CoCreate-filter/commit/9687ed701a078e745642cd7aaaeb97cd78b3488a))

## [1.8.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.8.0...v1.8.1) (2022-09-22)


### Bug Fixes

* contain applied as default case ([0772ebc](https://github.com/CoCreate-app/CoCreate-filter/commit/0772ebc27ee1c6458e4f8abc9ce93a63a134bd8f))

# [1.8.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.10...v1.8.0) (2022-09-22)


### Bug Fixes

* apply filter-value-type to filter-order, improvements to sortData function ([afe7142](https://github.com/CoCreate-app/CoCreate-filter/commit/afe7142849f68125fa29093c2014686970047c4e))
* items array converted to map ([cc2ad3b](https://github.com/CoCreate-app/CoCreate-filter/commit/cc2ad3b26bac1abd8f72cb4ad34f3deb2f5123aa))
* moved item.filter.el to item.el inorder to remove el from shallow copy . ([a704bf2](https://github.com/CoCreate-app/CoCreate-filter/commit/a704bf29c53c9500014580563be048e934a46552))
* removed metadata.isRefresh ([b0fe4ae](https://github.com/CoCreate-app/CoCreate-filter/commit/b0fe4aecea35ef161af5f4d1adf7ada13d11ff9b))
* rename variable results to data. supports filter value array and object ([6369e11](https://github.com/CoCreate-app/CoCreate-filter/commit/6369e11b3f51ef0c1f9a445e36757d82cece3ade))
* renamed filterData to searchData ([549bff2](https://github.com/CoCreate-app/CoCreate-filter/commit/549bff29a690eaa94e45c87d05208e2acd1fe5a6))
* support for server or browser ([0e0d91e](https://github.com/CoCreate-app/CoCreate-filter/commit/0e0d91e5562e800d9b01ce942d47fad7a9003ab3))
* update to item.filter ([d992647](https://github.com/CoCreate-app/CoCreate-filter/commit/d9926470f622c927d7f3e03a565da401eb048d4c))


### Features

* filters.js accessible by server-side. operator param renamed to filter. all filter related params are nested in filter ([b4a4d3d](https://github.com/CoCreate-app/CoCreate-filter/commit/b4a4d3d90de92496e2f50441c86b9ff65222ecec))
* utility functions for quering and sorting data ([16354ad](https://github.com/CoCreate-app/CoCreate-filter/commit/16354adb26f3a8956ee9137f6a4ba208eba93611))

## [1.7.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.9...v1.7.10) (2022-09-01)


### Bug Fixes

* bump all of [@cocreate](https://github.com/cocreate) dependencies ([fd7f1dc](https://github.com/CoCreate-app/CoCreate-filter/commit/fd7f1dce37d907ed71db11c75d11a0f51c210977))

## [1.7.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.8...v1.7.9) (2022-08-19)


### Bug Fixes

* renamed order-by and order-type to filter-order-name and filter-order-type ([a8474a6](https://github.com/CoCreate-app/CoCreate-filter/commit/a8474a67f01b8485298bbac37a502627fd930d5a))

## [1.7.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.7...v1.7.8) (2022-07-25)


### Bug Fixes

* if !value get Attribute order-type ([c543a02](https://github.com/CoCreate-app/CoCreate-filter/commit/c543a021dcab084dadb1cc8cf7fd16a7d52b1019))
* if fieldvalue required for contain ([203a65c](https://github.com/CoCreate-app/CoCreate-filter/commit/203a65ca3e779fa2a84302205d1c48e46637fc73))

## [1.7.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.6...v1.7.7) (2022-06-19)


### Bug Fixes

* update templates to use placeholder ([37c0113](https://github.com/CoCreate-app/CoCreate-filter/commit/37c011384acaa53d82927f97e362b5ecb7f63d1b))

## [1.7.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.5...v1.7.6) (2022-06-18)


### Bug Fixes

* bump dependencies ([de694fe](https://github.com/CoCreate-app/CoCreate-filter/commit/de694fe8c0aca325d9bcd88bf2b34865293f57f8))

## [1.7.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.4...v1.7.5) (2022-06-12)


### Bug Fixes

* update dependencies ([e3bf0bd](https://github.com/CoCreate-app/CoCreate-filter/commit/e3bf0bd768a0c3ea5f35f6a2343ec5e87df6f5a6))
* update docs css document_id ([de0b7d6](https://github.com/CoCreate-app/CoCreate-filter/commit/de0b7d6fb799961da357fe4e996957e8e9f6d80e))
* update modal btn to actions ([2132d73](https://github.com/CoCreate-app/CoCreate-filter/commit/2132d7305b01a35b1e8f3226ccc256c5e70e852f))

## [1.7.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.3...v1.7.4) (2022-06-02)


### Bug Fixes

* update padding of datables td element ([4587dc6](https://github.com/CoCreate-app/CoCreate-filter/commit/4587dc6490c406a507a7fcf5f6577ef038ed85c0))

## [1.7.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.2...v1.7.3) (2022-05-26)


### Bug Fixes

* reset search.value array onchange to resolve bug of items in list not filtering ([a720f3e](https://github.com/CoCreate-app/CoCreate-filter/commit/a720f3e379dc38bee2b7e66a229d4845bc66096d))

## [1.7.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.1...v1.7.2) (2022-05-23)


### Bug Fixes

* bump all dependencies ([ef4e08f](https://github.com/CoCreate-app/CoCreate-filter/commit/ef4e08fb31f9f13655296931e6c301f55d70cbeb))

## [1.7.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.7.0...v1.7.1) (2022-05-19)


### Bug Fixes

* update document_id on link index.css ([408252f](https://github.com/CoCreate-app/CoCreate-filter/commit/408252f40610ef197f8d0efd51ce6266a579eb2c))

# [1.7.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.11...v1.7.0) (2022-05-14)


### Features

* function readDocumentList has been renamed to readDocuments ([7b5bef0](https://github.com/CoCreate-app/CoCreate-filter/commit/7b5bef06e0c871da6e750ffe3cc85d4ba82a1742))

## [1.6.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.10...v1.6.11) (2022-05-06)


### Bug Fixes

* update config organization_Id to organization_id ([4ce5c67](https://github.com/CoCreate-app/CoCreate-filter/commit/4ce5c67b8fca2bfe142529012824568134cbb008))

## [1.6.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.9...v1.6.10) (2022-04-15)


### Bug Fixes

* removed [] from placeholder {{...}} ([58f3152](https://github.com/CoCreate-app/CoCreate-filter/commit/58f31525d23c4871e5dd6f84fdc418fd6ff86f16))

## [1.6.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.8...v1.6.9) (2022-02-24)


### Bug Fixes

* CoCreate.config replace CoCreate.app with * ([2d7f54a](https://github.com/CoCreate-app/CoCreate-filter/commit/2d7f54a76c0f4e36c86fe086ff74812f59b1745c))

## [1.6.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.7...v1.6.8) (2022-02-16)


### Bug Fixes

* update dependencies ([31e98a0](https://github.com/CoCreate-app/CoCreate-filter/commit/31e98a093e8918286cfdb077271d2a6f1e9d6913))

## [1.6.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.6...v1.6.7) (2022-02-16)


### Bug Fixes

* update action param to name ([88821b5](https://github.com/CoCreate-app/CoCreate-filter/commit/88821b5e643ecb6fcb8dafff748a819e85c042f2))

## [1.6.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.5...v1.6.6) (2022-02-10)


### Bug Fixes

* fix bug cannot read event ([7b15b23](https://github.com/CoCreate-app/CoCreate-filter/commit/7b15b23ffd6c4b35a8c17f36550b6b6c52f24767))

## [1.6.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.4...v1.6.5) (2022-02-10)


### Bug Fixes

* if filter value empty check if event.target matches element. if true apply filter ([113c814](https://github.com/CoCreate-app/CoCreate-filter/commit/113c814f649fb5d835ed80de0100f292af9ed6d4))

## [1.6.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.3...v1.6.4) (2022-02-07)


### Bug Fixes

* bump dependency versions ([0ca29ec](https://github.com/CoCreate-app/CoCreate-filter/commit/0ca29ec6ab08213e466c98c83c50b7999a7f18dc))

## [1.6.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.2...v1.6.3) (2022-02-07)


### Bug Fixes

* when fiter is updated rest filters, orders and searches ([f77c5ab](https://github.com/CoCreate-app/CoCreate-filter/commit/f77c5abc904a02447b98828a87085cb5d98623ac))

## [1.6.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.1...v1.6.2) (2022-02-06)


### Bug Fixes

* removed if(fieldValue === undefined) return from function filterItem ([f176e29](https://github.com/CoCreate-app/CoCreate-filter/commit/f176e29a6ee9925a42507a894fb3d578cb488912))
* test actions ([fd3564d](https://github.com/CoCreate-app/CoCreate-filter/commit/fd3564d5fec626e0ef8842afea6759c66442a84e))

## [1.6.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.6.0...v1.6.1) (2022-02-03)


### Bug Fixes

* replaced show and hide class hidden with attribute hidden ([d9a6e33](https://github.com/CoCreate-app/CoCreate-filter/commit/d9a6e33424eb091be09dce372ca1f2d37e1a5ba8))

# [1.6.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.5.3...v1.6.0) (2022-02-02)


### Features

* Now uses one querySelector, adds events to elements if element does not already have event, observe new filter nodes and changes to filter attributes ([d4ad78b](https://github.com/CoCreate-app/CoCreate-filter/commit/d4ad78bdbf04d8fba245e91d2bd8a6ba84394ab4))

## [1.5.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.5.2...v1.5.3) (2022-02-01)


### Bug Fixes

* update dependency versions ([c549c7d](https://github.com/CoCreate-app/CoCreate-filter/commit/c549c7d1a4a865c6e2d3933c8734d236150db7a9))

## [1.5.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.5.1...v1.5.2) (2022-01-30)


### Bug Fixes

* observe atributes for changes ([e360f2b](https://github.com/CoCreate-app/CoCreate-filter/commit/e360f2bf0cc088a171f6c66c831c14c451208853))

## [1.5.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.5.0...v1.5.1) (2022-01-29)


### Bug Fixes

* comment observer for filter-name and fiter-value, CoCreate-filter requires a refactor ([04b0377](https://github.com/CoCreate-app/CoCreate-filter/commit/04b0377ebb180cbc77b3fd9c6e827e66bffd6497))

# [1.5.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.4.0...v1.5.0) (2022-01-28)


### Features

* checkFilter function to return true or fase if filter should be applied. Added @cocreate/observer ([4ee811e](https://github.com/CoCreate-app/CoCreate-filter/commit/4ee811e66066402fcce502689ad3dfbc72c4d046))

# [1.4.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.3.2...v1.4.0) (2022-01-23)


### Features

* fetch-collections attribute to return a list of collections ([ce502da](https://github.com/CoCreate-app/CoCreate-filter/commit/ce502da50521c3266bc469e478bce38031ea6f25))

## [1.3.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.3.1...v1.3.2) (2022-01-16)


### Bug Fixes

* update class overflow:overlay to overflow:auto ([ad4462a](https://github.com/CoCreate-app/CoCreate-filter/commit/ad4462a240b241ffd2acf417c813ac46921650e5))

## [1.3.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.3.0...v1.3.1) (2022-01-01)


### Bug Fixes

* get-value attribute value now supports a selector added # to all values currently in get-value attributes ([9d2da4c](https://github.com/CoCreate-app/CoCreate-filter/commit/9d2da4c3f3f39aa803f59d28e72e46df5fb5e544))

# [1.3.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.2.1...v1.3.0) (2021-12-27)


### Features

* changeFilter function ([7dee08b](https://github.com/CoCreate-app/CoCreate-filter/commit/7dee08b936c7556b76bc329f9be3867609b92f50))

## [1.2.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.2.0...v1.2.1) (2021-12-23)


### Bug Fixes

* renamed filter-value_type to filter-value-type ([5c93288](https://github.com/CoCreate-app/CoCreate-filter/commit/5c9328858731fc950849e2373b9635375dc661cc))

# [1.2.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.59...v1.2.0) (2021-12-23)


### Features

* deleteDocumentsAction ([3f6312c](https://github.com/CoCreate-app/CoCreate-filter/commit/3f6312cc532928d245b6f8e03f830b915f25f609))

## [1.1.59](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.58...v1.1.59) (2021-12-15)


### Bug Fixes

* update dependencies ([ac12247](https://github.com/CoCreate-app/CoCreate-filter/commit/ac12247fcbb286993f0797100e54f1110226acad))

## [1.1.58](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.57...v1.1.58) (2021-12-14)


### Bug Fixes

* update dependencies ([ff61bc0](https://github.com/CoCreate-app/CoCreate-filter/commit/ff61bc0188bc044b5c5687b7f32cba71c7e934dd))

## [1.1.57](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.56...v1.1.57) (2021-11-27)


### Bug Fixes

* actions import typo ([be7fbf1](https://github.com/CoCreate-app/CoCreate-filter/commit/be7fbf1d1590b464dca59ad8235b42f5fec4a19f))
* update dependencies ([5c54696](https://github.com/CoCreate-app/CoCreate-filter/commit/5c546965c050710796b7852459206a78df10f0bc))

## [1.1.56](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.55...v1.1.56) (2021-11-27)


### Bug Fixes

* update dependencies ([9121b3f](https://github.com/CoCreate-app/CoCreate-filter/commit/9121b3f150bdcad5cfce672e0496b4f8be4a9006))

## [1.1.55](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.54...v1.1.55) (2021-11-27)


### Bug Fixes

* update docs api and cocreateJS script ([ec71f25](https://github.com/CoCreate-app/CoCreate-filter/commit/ec71f25c09f1a8deb582cf8675fe7807b0af275f))

## [1.1.54](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.53...v1.1.54) (2021-11-26)


### Bug Fixes

* doc missing main tag ([e2fc82f](https://github.com/CoCreate-app/CoCreate-filter/commit/e2fc82f0ebb8ca9f3ab6e945b9dad37baa9967d8))

## [1.1.53](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.52...v1.1.53) (2021-11-26)


### Bug Fixes

* docs sidenav width ([fc7e20a](https://github.com/CoCreate-app/CoCreate-filter/commit/fc7e20a9bf50308849eab597d9bc4f1104eb793b))
* updated action dependency to actions ([2685cc8](https://github.com/CoCreate-app/CoCreate-filter/commit/2685cc88c7dee49959cbf0c05e8087da1cf5e47a))

## [1.1.52](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.51...v1.1.52) (2021-11-26)


### Bug Fixes

* update dependencies ([3ebb386](https://github.com/CoCreate-app/CoCreate-filter/commit/3ebb386d599be07128b3294123bb39b28d59e018))

## [1.1.51](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.50...v1.1.51) (2021-11-23)


### Bug Fixes

* update dependencies ([9b39989](https://github.com/CoCreate-app/CoCreate-filter/commit/9b399896ba799f5ace05d70e2fdbf5a2b337df3c))

## [1.1.50](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.49...v1.1.50) (2021-11-20)


### Bug Fixes

* updated script tags and link tags ([744fb05](https://github.com/CoCreate-app/CoCreate-filter/commit/744fb05074765e88829faffdd78aaff2237ef6f1))

## [1.1.49](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.48...v1.1.49) (2021-11-20)


### Bug Fixes

* update dependencies ([3ac9908](https://github.com/CoCreate-app/CoCreate-filter/commit/3ac9908f15c321f1624a1d533390f1a5d78d594e))

## [1.1.48](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.47...v1.1.48) (2021-11-19)


### Bug Fixes

* update dependencies ([4193323](https://github.com/CoCreate-app/CoCreate-filter/commit/41933236230063a09b664392e639ae34e584fd66))

## [1.1.47](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.46...v1.1.47) (2021-11-18)


### Bug Fixes

* update dependencies ([a33c8b9](https://github.com/CoCreate-app/CoCreate-filter/commit/a33c8b9f622df862ed7682bc1c5efa3234b28b12))

## [1.1.46](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.45...v1.1.46) (2021-11-16)


### Bug Fixes

* update dependencies ([3cbad46](https://github.com/CoCreate-app/CoCreate-filter/commit/3cbad46eede1edbe6f5592dc115318bdd5809b05))

## [1.1.45](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.44...v1.1.45) (2021-11-15)


### Bug Fixes

* update dependencies ([ea786e6](https://github.com/CoCreate-app/CoCreate-filter/commit/ea786e66bdf08e58cf96b0229ddcbeebcf04923d))

## [1.1.44](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.43...v1.1.44) (2021-11-11)


### Bug Fixes

* update readme ([3247277](https://github.com/CoCreate-app/CoCreate-filter/commit/3247277cad4d0b3fba8f41161038cb753a8496c9))

## [1.1.43](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.42...v1.1.43) (2021-11-06)


### Bug Fixes

* update dependencies ([fd92a6b](https://github.com/CoCreate-app/CoCreate-filter/commit/fd92a6b4efdfa299ccc8be9eb83922829e838f9e))

## [1.1.42](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.41...v1.1.42) (2021-11-04)


### Bug Fixes

* update dependencies ([63869b9](https://github.com/CoCreate-app/CoCreate-filter/commit/63869b9707e2e70d4a6ddff1b0595329fc8fc7e2))

## [1.1.41](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.40...v1.1.41) (2021-11-04)


### Bug Fixes

* update packages ([5240bdd](https://github.com/CoCreate-app/CoCreate-filter/commit/5240bdd7b86ce9c60075b7d958a4a61497573125))

## [1.1.40](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.39...v1.1.40) (2021-11-01)


### Bug Fixes

* update package dependencies ([586dd8b](https://github.com/CoCreate-app/CoCreate-filter/commit/586dd8b3f09d261cf86b450a546936bd5a39c230))

## [1.1.39](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.38...v1.1.39) (2021-10-29)


### Bug Fixes

* update dependencies ([d7acacd](https://github.com/CoCreate-app/CoCreate-filter/commit/d7acacd17bbd6e8a0b99b7973d680c1d01178829))

## [1.1.38](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.37...v1.1.38) (2021-10-16)


### Bug Fixes

* update crud ([623e4cf](https://github.com/CoCreate-app/CoCreate-filter/commit/623e4cf3f21172d38c0c0c4434238a5a40acb79c))

## [1.1.37](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.36...v1.1.37) (2021-10-16)


### Bug Fixes

* updated dependency ([e404c67](https://github.com/CoCreate-app/CoCreate-filter/commit/e404c67d8737dec1e6f787b5dfaedd26e7649dee))

## [1.1.36](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.35...v1.1.36) (2021-10-16)


### Bug Fixes

* update socket package to fix bug in docs ([2f52d6f](https://github.com/CoCreate-app/CoCreate-filter/commit/2f52d6fbc545134e998cd5021d58d63a673b0db6))

## [1.1.35](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.34...v1.1.35) (2021-10-16)


### Bug Fixes

* update dependencies ([4123c99](https://github.com/CoCreate-app/CoCreate-filter/commit/4123c996179b71c210f3c1f8fe3dd74f60193748))

## [1.1.34](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.33...v1.1.34) (2021-10-15)


### Bug Fixes

* update dependencies ([03b2b1f](https://github.com/CoCreate-app/CoCreate-filter/commit/03b2b1f2719dc0b00d62c370f2ec5f8900433b9d))

## [1.1.33](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.32...v1.1.33) (2021-10-15)


### Bug Fixes

* update dependencies ([bd81b20](https://github.com/CoCreate-app/CoCreate-filter/commit/bd81b20b03edcd3421cbe31b5f542946133db8b8))
* update dependencies ([7c2d90f](https://github.com/CoCreate-app/CoCreate-filter/commit/7c2d90ffe4079412dd83eb14dba7e98449b26279))

## [1.1.32](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.31...v1.1.32) (2021-10-15)


### Bug Fixes

* update packages ([1b508ad](https://github.com/CoCreate-app/CoCreate-filter/commit/1b508adea773e9d5568bebd8a07b6ef5b366c2ad))

## [1.1.31](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.30...v1.1.31) (2021-10-15)


### Bug Fixes

* update packages ([5492b46](https://github.com/CoCreate-app/CoCreate-filter/commit/5492b464e150315600af829b3b1c4595c2dbbf2d))
* updated dependencies ([d662eb5](https://github.com/CoCreate-app/CoCreate-filter/commit/d662eb59995f8c13cdbf73993b064bef090bc96f))

## [1.1.30](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.29...v1.1.30) (2021-10-13)


### Bug Fixes

* update descriptions ([9a895f1](https://github.com/CoCreate-app/CoCreate-filter/commit/9a895f1fbd675fe364795fd489885967c1da7815))

## [1.1.29](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.28...v1.1.29) (2021-10-13)


### Bug Fixes

* update dependencies ([d21c0e4](https://github.com/CoCreate-app/CoCreate-filter/commit/d21c0e4cee6ea418d00674a7c214b7c1b24db3e5))

## [1.1.28](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.27...v1.1.28) (2021-10-13)


### Bug Fixes

* update packages ([8ca6e0d](https://github.com/CoCreate-app/CoCreate-filter/commit/8ca6e0d3dc34f6f8f934af1d5e707d8e2e68ddd5))

## [1.1.27](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.26...v1.1.27) (2021-10-06)


### Bug Fixes

* update dependencies ([90748c8](https://github.com/CoCreate-app/CoCreate-filter/commit/90748c8647f00c5ca2c7e12da750a1aff1299240))

## [1.1.26](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.25...v1.1.26) (2021-10-05)


### Bug Fixes

* update dependencies ([7234630](https://github.com/CoCreate-app/CoCreate-filter/commit/7234630abfe6d8e01c01cf9050b3cbc8107a0d9e))
* website_id in CoCreate.config ([9bde809](https://github.com/CoCreate-app/CoCreate-filter/commit/9bde809dc62bf9f902593d8f21cd5fa932e6e481))

## [1.1.25](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.24...v1.1.25) (2021-10-04)


### Bug Fixes

* update dependencies ([506255a](https://github.com/CoCreate-app/CoCreate-filter/commit/506255a826bd27c8ebb2f8ec90c1fe9bd14a8339))

## [1.1.24](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.23...v1.1.24) (2021-10-04)


### Bug Fixes

* update dependencies ([52d47e1](https://github.com/CoCreate-app/CoCreate-filter/commit/52d47e1e5b81b7493e68a305bdd13e556058014e))

## [1.1.23](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.22...v1.1.23) (2021-10-01)


### Bug Fixes

* update packages ([37c8178](https://github.com/CoCreate-app/CoCreate-filter/commit/37c817800d4e5d076d7362a8514e9adc7b084d66))

## [1.1.22](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.21...v1.1.22) (2021-10-01)


### Bug Fixes

* update dependencies ([3da2ffc](https://github.com/CoCreate-app/CoCreate-filter/commit/3da2ffc235aab2f0d9f93bad394aa18e33af6c0d))

## [1.1.21](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.20...v1.1.21) (2021-09-28)


### Bug Fixes

* update dependencies ([ffc21af](https://github.com/CoCreate-app/CoCreate-filter/commit/ffc21af7f6eed89e840bda528e0c6e320face9e6))

## [1.1.20](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.19...v1.1.20) (2021-09-16)


### Bug Fixes

* update dependencies ([f0a9fb0](https://github.com/CoCreate-app/CoCreate-filter/commit/f0a9fb0a1e5eca04cec0a994ef485e14cdba23f6))

## [1.1.19](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.18...v1.1.19) (2021-09-14)


### Bug Fixes

* add cocreate.app to domains ([e7178f6](https://github.com/CoCreate-app/CoCreate-filter/commit/e7178f68981dbed6401e9b289a442e9471fedf51))

## [1.1.18](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.17...v1.1.18) (2021-09-13)


### Bug Fixes

* upgrade dependencies ([68b7be0](https://github.com/CoCreate-app/CoCreate-filter/commit/68b7be0c8b98c409cc29e23892fbd8a05cf0fbbb))

## [1.1.17](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.16...v1.1.17) (2021-09-12)


### Bug Fixes

* update sidenav to use resize and toggle ([66b2c47](https://github.com/CoCreate-app/CoCreate-filter/commit/66b2c4725a916063695d8f7ed1718b36a081c0f7))

## [1.1.16](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.15...v1.1.16) (2021-09-09)


### Bug Fixes

* update dependency @cocreate/docs ([b118142](https://github.com/CoCreate-app/CoCreate-filter/commit/b118142b888122d09d05f7a3a58aae28566c01ca))

## [1.1.15](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.14...v1.1.15) (2021-09-09)


### Bug Fixes

* ci docs ([4fe50b9](https://github.com/CoCreate-app/CoCreate-filter/commit/4fe50b964a4c77b8fe0af1cd969fac2a8a24e116))

## [1.1.14](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.13...v1.1.14) (2021-09-09)


### Bug Fixes

* update dependencies ([934f722](https://github.com/CoCreate-app/CoCreate-filter/commit/934f722a0e0044af85a2ad83184580da0de48c58))

## [1.1.13](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.12...v1.1.13) (2021-09-09)


### Bug Fixes

* CoCreate.config directory, path, name and  public ([26a2ee4](https://github.com/CoCreate-app/CoCreate-filter/commit/26a2ee40cafbc5bc8cd84ba279ffc57751225489))

## [1.1.12](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.11...v1.1.12) (2021-09-08)


### Bug Fixes

* update dependencies ([40b5936](https://github.com/CoCreate-app/CoCreate-filter/commit/40b5936e1aa748931f4c441f969f3ffde1d1a2a3))

## [1.1.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.10...v1.1.11) (2021-09-06)


### Bug Fixes

* selector bug ([d8b6096](https://github.com/CoCreate-app/CoCreate-filter/commit/d8b609690c0ba830e9587b64d56b485caa4b3812))

## [1.1.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.9...v1.1.10) (2021-09-04)


### Bug Fixes

* update dependencies ([afc4829](https://github.com/CoCreate-app/CoCreate-filter/commit/afc482965dde4e1f1860439e7b2286f214bed442))

## [1.1.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.8...v1.1.9) (2021-08-31)


### Bug Fixes

* update dependencies ([6906963](https://github.com/CoCreate-app/CoCreate-filter/commit/69069636167bddd8b7a4725f275992bb820b7302))

## [1.1.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.7...v1.1.8) (2021-08-27)


### Bug Fixes

* updaed dependencies ([7e36f13](https://github.com/CoCreate-app/CoCreate-filter/commit/7e36f1329e1592b05255ca4d02d67c69f8350402))

## [1.1.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.6...v1.1.7) (2021-08-22)


### Bug Fixes

* removed data- from main-content, clone, filter-value_type ([bc0a276](https://github.com/CoCreate-app/CoCreate-filter/commit/bc0a27617f7efff494020909d5f6de3c24692fc8))

## [1.1.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.5...v1.1.6) (2021-08-22)


### Bug Fixes

* bump package versions ([830093c](https://github.com/CoCreate-app/CoCreate-filter/commit/830093c7d6cba98da00313c453ef3b1f8c9f64bb))

## [1.1.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.4...v1.1.5) (2021-08-22)


### Bug Fixes

* bump package versions ([95a4332](https://github.com/CoCreate-app/CoCreate-filter/commit/95a433277bcc5e54c972268459233a9d79179748))

## [1.1.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.3...v1.1.4) (2021-08-14)


### Bug Fixes

* rename data-element_id to element_id ([95658d3](https://github.com/CoCreate-app/CoCreate-filter/commit/95658d35ff2a11248ae76dcaa1cb516b78768d02))

## [1.1.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.2...v1.1.3) (2021-08-13)


### Bug Fixes

* export triggered by actions ([d01dc7e](https://github.com/CoCreate-app/CoCreate-filter/commit/d01dc7e6f6fbb320c5204b1141ad3e8c56ea17d9))
* update to  docs ([552b99a](https://github.com/CoCreate-app/CoCreate-filter/commit/552b99a946c763d9e960998785ca79ab8de52d6a))

## [1.1.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.1...v1.1.2) (2021-08-12)


### Bug Fixes

* update data-module_id to document_id ([7e4b3e3](https://github.com/CoCreate-app/CoCreate-filter/commit/7e4b3e3342a050f991715cf2b8d293234dc2d211))

## [1.1.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.1.0...v1.1.1) (2021-08-02)


### Bug Fixes

* remove data- from attributes ([78a1ae8](https://github.com/CoCreate-app/CoCreate-filter/commit/78a1ae8544da082ff1c542108a52e028022bda41))
* remove data- from fetch, pass and filter ([16e1bb8](https://github.com/CoCreate-app/CoCreate-filter/commit/16e1bb898f2680c981ceb4db689eab3954749cd3))
* update data-fullscreen to fullscreen ([ec1efdc](https://github.com/CoCreate-app/CoCreate-filter/commit/ec1efdc71673b7a5f5888af2aa617ed449e712f3))

# [1.1.0](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.21...v1.1.0) (2021-07-28)


### Features

* add new is{attribute} system and remove data- from attributtes ([cfc93a7](https://github.com/CoCreate-app/CoCreate-filter/commit/cfc93a7f6595eff32c3ecea1a2bb2aaa154af2a8))

## [1.0.21](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.20...v1.0.21) (2021-07-17)


### Bug Fixes

* init and update demos scripts ([8c17746](https://github.com/CoCreate-app/CoCreate-filter/commit/8c17746be25a066c65b3146112fa22ac2860801d))
* workflows ([4cd1227](https://github.com/CoCreate-app/CoCreate-filter/commit/4cd122700da13ba44c37ffeedbbb80740859eae5))

## [1.0.20](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.19...v1.0.20) (2021-07-14)


### Bug Fixes

* upgrade all packages ([de002bd](https://github.com/CoCreate-app/CoCreate-filter/commit/de002bd67f8583fbb35119c55dbd823f4495f4e0))

## [1.0.19](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.18...v1.0.19) (2021-07-13)


### Bug Fixes

* add yarn lockfile to git ignore ([f3bd7d1](https://github.com/CoCreate-app/CoCreate-filter/commit/f3bd7d11e3799e3d0fa4f12b1c777449d472abf0))
* remove yarn.lock ([54f4a4b](https://github.com/CoCreate-app/CoCreate-filter/commit/54f4a4b4cdf1f694d98d9cd0d469e3c2f16a3bde))

## [1.0.18](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.17...v1.0.18) (2021-07-10)


### Bug Fixes

* gitignore all logs ([18e6840](https://github.com/CoCreate-app/CoCreate-filter/commit/18e684035750db618378f09307d0ccfdacba5ba2))

## [1.0.17](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.16...v1.0.17) (2021-07-07)


### Bug Fixes

* update package versions ([587f40b](https://github.com/CoCreate-app/CoCreate-filter/commit/587f40b9e7221573cf231c14fec890d5294a6dae))

## [1.0.16](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.15...v1.0.16) (2021-06-30)


### Bug Fixes

* Update readme.md ([9468269](https://github.com/CoCreate-app/CoCreate-filter/commit/94682693f2b57d203170b453b7c63fc2e9d942fe))

## [1.0.15](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.14...v1.0.15) (2021-06-30)


### Bug Fixes

* automated and manual workflows ([545caa0](https://github.com/CoCreate-app/CoCreate-filter/commit/545caa0702fc1fb41c70aafb537e0248092b7b8d))

## [1.0.14](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.13...v1.0.14) (2021-06-25)


### Bug Fixes

* latest version numbers applied to all cocreate packages ([1b37ccc](https://github.com/CoCreate-app/CoCreate-filter/commit/1b37ccc6b31701df73eb462dad122425f40dc75f))

## [1.0.13](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.12...v1.0.13) (2021-06-24)


### Bug Fixes

* package versioningto 1.0.0 ([d360580](https://github.com/CoCreate-app/CoCreate-filter/commit/d36058045638dce2ffcadab3f783c3ad74dd0f98))

## [1.0.12](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.11...v1.0.12) (2021-06-24)


### Bug Fixes

* update all [@cocreate](https://github.com/cocreate) to use latest versions ([435973e](https://github.com/CoCreate-app/CoCreate-filter/commit/435973e3dd3d002932985e8c7dc35816ddd49648))

## [1.0.11](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.10...v1.0.11) (2021-06-20)


### Bug Fixes

* new mutaionObserver init function ([1bd2cb4](https://github.com/CoCreate-app/CoCreate-filter/commit/1bd2cb4a11f6a9b7316cbd2a9d1b35120bc4ba90))

## [1.0.10](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.9...v1.0.10) (2021-06-16)


### Bug Fixes

* added header for seo ([99bd625](https://github.com/CoCreate-app/CoCreate-filter/commit/99bd6257ff54883d38ca38d5109cb5f6a6865d6a))

## [1.0.9](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.8...v1.0.9) (2021-05-08)


### Bug Fixes

* add css auto parse and save to docs. ([8f4a1b0](https://github.com/CoCreate-app/CoCreate-filter/commit/8f4a1b0a046d17f5cbe4c851f4118b24c2696093))

## [1.0.8](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.7...v1.0.8) (2021-04-27)


### Bug Fixes

* Update to readme, demo, added cdn scripts ([c95c928](https://github.com/CoCreate-app/CoCreate-filter/commit/c95c928ba4a9589b1181238e00326cfaab4b2bda))

## [1.0.7](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.6...v1.0.7) (2021-04-23)


### Bug Fixes

* readme and documentation. Removed securitykeys ([2e00dea](https://github.com/CoCreate-app/CoCreate-filter/commit/2e00dea68180da03ea4c23d5064c03783e7d9fa4))

## [1.0.6](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.5...v1.0.6) (2021-04-23)


### Bug Fixes

* ci and build process ([988e534](https://github.com/CoCreate-app/CoCreate-filter/commit/988e5348dbafc699ddb51fe25746825865bcd6eb))
* npm publish and cdn deployment ([ed2ec5b](https://github.com/CoCreate-app/CoCreate-filter/commit/ed2ec5b5308d4f67ef86e6e551f0c310a8ad9376))

## [1.0.5](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.4...v1.0.5) (2021-04-04)


### Bug Fixes

* Remove crud from package.json ([028e897](https://github.com/CoCreate-app/CoCreate-filter/commit/028e897453f3d213484f525fe6b9adfe682b1d2f))

## [1.0.4](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.3...v1.0.4) (2021-04-04)


### Bug Fixes

* update socket to socket-lient and crud to crud client" ([b4e92cb](https://github.com/CoCreate-app/CoCreate-filter/commit/b4e92cbf3f6d51bda2abc83ebaf0381c70e7af38))

## [1.0.3](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.2...v1.0.3) (2021-03-30)


### Bug Fixes

* import paths using npm ([e048364](https://github.com/CoCreate-app/CoCreate-filter/commit/e0483645e7cf211e2fc987b4275df43ef13136cd))

## [1.0.2](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.1...v1.0.2) (2021-03-30)


### Bug Fixes

* cocreatejs from npm ([57fba77](https://github.com/CoCreate-app/CoCreate-filter/commit/57fba773afc4febd03e1a3f72f22bd4c98ce9464))

## [1.0.1](https://github.com/CoCreate-app/CoCreate-filter/compare/v1.0.0...v1.0.1) (2021-03-29)


### Bug Fixes

* Package Paths ([d2cb3cc](https://github.com/CoCreate-app/CoCreate-filter/commit/d2cb3cc3d4051add6fd8ff7277c15eee1f5692b3))

# 1.0.0 (2021-03-26)


### Features

* Initial Release ([693da2c](https://github.com/CoCreate-app/CoCreate-filter/commit/693da2cf5f22519c3242d05c1192621c47a73157))
