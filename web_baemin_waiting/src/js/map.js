export class Map {

    constructor() {
        this.btnSearchLocation = document.querySelector("#btn-search-location");
        this.btnMapClose = document.querySelector("#btn-map-close");
        this.btnConfirm = document.querySelector("#btn-map-confirm");
    }

    on() {
        this.btnSearchLocation.addEventListener("click", () => {
            const location = document.querySelector("#regist-location").value;
            if (location) {
                this.searchLocationOnMap(location);
            } else {
                alert("도로명 주소를 먼저 입력해주세요");
            }
        });

        this.btnMapClose.addEventListener("click", () => {
            document.querySelector(".map-modal").style.display = "none";
        });

        this.btnConfirm.addEventListener("click", () => {
            document.querySelector(".map-modal").style.display = "none";
        });

    }

    searchLocationOnMap(location) {
        var map = new naver.maps.Map('map');
        var myaddress = location;

        naver.maps.Service.geocode({address: myaddress}, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert(myaddress + "의 검색 결과가 없습니다. 주소를 확인해주세요");
            } else {
                document.querySelector(".map-modal").style.display = "block";
                var result = response.result;
                var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
                
                map.setCenter(myaddr); 
                
                this.addrX = myaddr.x;
                this.addrY = myaddr.y;
                // 마커 표시
                var marker = new naver.maps.Marker({
                    position: myaddr,
                    map: map
                });   
            }
        }.bind(this));

    }

}