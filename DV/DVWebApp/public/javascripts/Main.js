(function () {
    'use strict';

    angular.module("dvApp", ['ngMaterial', 'ngRoute'])
        .config(function ($routeProvider) {

            $routeProvider
                .when("/admin", {

                    template: "<h1>this is cooool : {{abcd}}</h1>",
                    resolve: function () {

                        alert(1);
                        return "oooooooooooooh";
                    }
                });
        })
        .controller("dvVachanaController", ["$scope", "$http", "$mdToast", function ($scope, $http, $mdToast) {

            var vm = this;
            vm.vachanaObj = {

                Date: new Date(),
                Vachana: "",
                Summary: "",
                Author: "",
                Contributor: ""
            };
            vm.displayText = "ಸಂದರ್ಶನಕ್ಕಾಗಿ";

            vm.Initialize = function (authors, contributors) {

                vm.Authors = authors.split(",");
                vm.Contributors = contributors.split(",");

                vm.GetVachana();
            };

            vm.GetVachana = function () {

                $http.get("/vachana/" + vm.vachanaObj.Date)
                    .then(function (response) {

                        ManageResponse(response);
                        vm.vachanaObj.id = response.data._id;
                        //vm.vachanaObj.Date = new Date(response.data.Date);
                        vm.vachanaObj.Vachana = response.data.Vachana;
                        vm.vachanaObj.Summary = response.data.Summary;
                        vm.vachanaObj.Author = response.data.Author;
                        vm.vachanaObj.Contributor = response.data.Contributor;

                        vm.displayText = "ಸಂದರ್ಶನಕ್ಕಾಗಿ";

                    }, function (error) {

                        ShowToast("failed", "error");
                    });
            };

            vm.setDisplayText = function (input) {

                vm.displayText = input;
            };

            vm.InsertNewOrUpdateVachana = function () {

                if (vm.vachanaObj.id) {

                    $http.put("/vachana", vm.vachanaObj)
                        .then(function (response) {

                            //ShowToast(" success ", "seccess");
                            ManageResponse(response);

                        }, function (error) {

                            ShowToast("failed", "error");
                        });
                } else {

                    $http.post("/vachana", vm.vachanaObj)
                        .then(function (response) {

                            //ShowToast(" success ", "success");
                            ManageResponse(response);
                            vm.vachanaObj.id = response.data._id;

                        }, function (error) {

                            ShowToast("failed", "error");
                        });
                }
            };

            function ManageResponse(response) {

                if (response == null || response.data == null || response.data.errors != null) {

                    ShowToast(response.data.message, "error");

                } else {

                    ShowToast("Success", "success");
                }
            }

            function ShowToast(msg, type) {

                $mdToast.show(
                    $mdToast.simple()
                        .toastClass('md-toast-' + type)
                        .textContent(msg)
                        .position('top left')
                        .action('X')
                        .hideDelay(10000)
                );
            }
        }])
        .controller("dvAdminController", ["$scope", "$http", "$mdToast", function ($scope, $http, $mdToast) {

            var vm = this;

            vm.Initialize = function (authors, contributors) {

                vm.Authors = authors.split(",").filter(function (el) { return el.trim().length != 0 });
                vm.Contributors = contributors.split(",").filter(function (el) { return el.trim().length != 0 });
            };

            vm.AddAssociate = function (input) {

                if (input === 1) {

                    if (vm.Authors.indexOf(vm.Author.trim()) > -1) {

                        ShowToast("duplicate authror", "error");
                    } else {

                        vm.Authors.push(vm.Author.trim());
                        vm.Author = "";
                    }

                }
                else if (input === 2) {

                    if (vm.Contributors.indexOf(vm.Contributor.trim()) > -1) {

                        ShowToast("duplicate contributor", "error");
                    } else {

                        vm.Contributors.push(vm.Contributor.trim());
                        vm.Contributor = "";
                    }
                }
            };

            vm.UpdateAssociatesListOnDb = function () {

                $http.post("/admin/associates", { Authors: vm.Authors, Contributors: vm.Contributors })
                    .then(function (response) {

                        //ShowToast("success", "success");
                        ManageResponse(response);

                    }, function (error) {

                        ShowToast("failed", "error");
                    });
            };

            function ManageResponse(response) {

                if (response == null || response.data == null || response.data.errors != null) {

                    ShowToast(response.data.message, "error");

                } else {

                    ShowToast("Success", "success");
                }
            }

            function ShowToast(msg, type) {

                $mdToast.show(
                    $mdToast.simple()
                        .toastClass('md-toast-' + type)
                        .textContent(msg)
                        .position('top left')
                        .action('X')
                        .hideDelay(10000)
                );
            }
        }]);
})();