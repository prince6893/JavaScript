
var cartApp = angular.module ("cartApp", []);

cartApp.controller("cartCtrl", function($scope, $http){

    $scope.refreshCart = function(){
       $http.get('http://localhost:9001/melody/rest/cart/' + $scope.cid).success(function (data){
           $scope.cart = data;
       });
    };

    $scope.clearCart = function(){
        $http.delete('http://localhost:9001/melody/rest/cart/' + $scope.cid).success($scope.refreshCart());
    };

    $scope.initCartId = function(cid){
        $scope.cid = cid;
        $scope.refreshCart(cid);
    };

    $scope.addToCart = function(pid){
    	alert('inside controller.js!');
        $http.put('/rest/cart/add/' + pid).success(function (){
            alert('Product successfully added to the cart!');
        });
    };

    $scope.removeFromCart = function(pid){
        $http.put('http://localhost:9001/melody/rest/cart/remove/' + pid).success(function(data){
           $scope.refreshCart();
        });
    };

    $scope.calGrandTotal = function(){
        var grandTotal = 0;

        for (var i = 0; i < $scope.cart.cartItems.length; i++){
            grandTotal += $scope.cart.cartItems[i].totalPrice;
        }

        return grandTotal;
    }
});