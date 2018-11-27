// 자판기 애플리케이션 v3.0

// 자판기 사용 클래스
const VendingMachineUsage = class {
    constructor({ stockManager }) {
        this.stockManager = stockManager;
        this.change = 0;
        this.itemNo = 0;
        this.itemNoList = [];
        this.deletedItemNoList = [];
        this.itemList = [];
    }

/*
const 자판기 사용 클래스 {

    //객체 생성에 필요한 변수 선언. 

    생성자(자판기 재고 관리 객체 주입) {
        this.자판기 재고 관리자 객체 = 객체 주입
        this.현재 잔액 = 0;
        this.상품 번호 = 0;
        this.상품 번호 리스트 = [];
        this.삭제된 상품 번호 리스트 = [];
        this.상품 리스트 = [];
    }
}        
*/

    // 현금 투입 
    insertCoin(coin) {
        console.log(`투입 금액: ${coin}원`);
        this.change += coin;
        console.log(`현재 잔액: ${this.change}원`);
        this.showAvailableItemList(this.change);
    }

    /*
    f 현금 투입 insertCoin (투입 금액) { 
        //자판기에 투입한 현금을 현재 잔액에 반영. 
        //이를 바탕으로 구매 가능한 상품 리스트 출력. 
                        
        console.log(투입 금액)
        현재 잔액 = 투입 금액
        console.log(현재 잔액)
        구매 가능 상품 리스트 출력 메소드(현재 잔액) 호출
    }
    */

    // 상품 선택 
    selectItem(itemNo, quantity) {
        this.checkStock(itemNo, quantity);
        this.showAvailableItemList(this.change); // 현재 잔액으로 구매 가능한 리스트 표시
    }

    /*
    f 상품 선택 selectItem (상품 번호, 수량) {
        //상품 번호와 수량을 지정하여 해당 상품 선택.
        //재고를 확인하여 실제 구매를 처리하는 메소드를 호출하고 잔액에 따른 구매 가능 상품 리스트 출력.  
        
        f 재고 확인 메소드(상품 번호, 수량) 호출
        f 구매 가능 상품 리스트 출력 메소드(현재 잔액) 호출
    }
    */

    // 잔액 반환 
    returnChange() {
        const returnedChange = this.change;
        this.change = 0;
        console.log(`잔액 ${returnedChange}원이 반환되었습니다.`);
    }

    /*
    f 잔액 반환 returnChange () {
        //자판기의 현재 잔액을 0원으로 초기화.
    
        const 반환된 잔액 = 현재 잔액
        현재 잔액 = 0
        console.log(반환된 잔액)
    }
    */

    // 재고 확인
    checkStock(itemNo, quantity) {
        console.log(`현재 잔액: ${this.change}원`);
        this.itemList.forEach(val => {
            if (val.itemNo === itemNo && val.stock >= quantity) {
                val.stock = this.handleOrder(quantity, val.price, val.itemName, val.stock);
                val.outOfStock = this.checkOutOfStock(val.stock, val.outOfStock);
            }
            else if (val.itemNo === itemNo && val.stock === 0) {
                console.log(`선택한 상품(${val.itemName})은 매진되었습니다. 다른 제품을 선택해주세요.`)
            }
            else if (val.itemNo === itemNo && val.stock !== 0 && val.stock < quantity) {
                console.log(`선택한 상품(${val.itemName})의 재고가 부족합니다. 구매 수량을 변경해주세요.`);
            }
        })
    }

    /*
    f 재고 확인 checkStock () {
        //상품 리스트를 열람하면서 선택한 상품의 재고 확인.
        //주문 처리(메소드 호출) 및 매진 여부 확인(메소드 호출). 
        //매진 또는 재고 부족 상품 선택시 관련 메시지를 출력.
            
        console.log(현재 잔액)
        상품 리스트.forEach({    
                    
            if(선택한 상품 있음 && 선택 수량만큼 재고 있음) {
                f 주문 처리 메소드 호출(수량, 가격, 상품명, 재고) return 변경된 재고
                f 매진 여부 확인 메소드 호출(재고, 매진 여부) return '매진' || '판매중'
            }
                    
            else if(선택한 상품 있음 && 재고가 0) {
                console.log(매진 메시지 출력)
            }
                
            else if(선택한 상품 있음 && 재고 있음 && 선택 수량이 재고를 초과) {
                console.log(재고 부족 메시지 출력)
            }
        }) 
    }
    */

    // 주문 처리
    handleOrder(quantity, price, itemName, stock) {
        const totalPrice = price * quantity;
        if (totalPrice <= this.change) {
            this.change -= totalPrice; 
            stock -= quantity; 
            console.log(`선택한 '${itemName}' ${quantity}개가 나왔습니다. 현재 잔액 ${this.change}원`);
            return stock;
        } else if (totalPrice > this.change || this.change === 0) {
            console.log(`잔액이 부족합니다.`);
        }
    }

    /*
    f 주문 처리 handleOrder (수량, 가격, 상품명, 재고) 리턴값: 변경된 재고 {
        //실제 구매 처리.
        //재고 확인 메소드에서 넘겨 받은 인자를 바탕으로 함.
        //현재 잔액에서 구매 금액을 제함. 
        //재고 수량을 변경. 
        //구매 완료 메시지 출력. 
        //변경한 재고 리턴. 
        
        const 구매금액 = 상품 가격 * 수량
                    
        if(구매금액이 잔액보다 적을 때) {
            현재 잔액 -= 구매금액(잔액 변경)
            재고 -= 수량(재고 변경)
            console.log(구매 완료 메시지)
            return 변경된 재고

        } else if (구매금액이 잔액보다 많거나 잔액이 0원일 때 ) {
            console.log(잔액 부족 메시지)
        }
    }
    */

    // 매진 여부 확인
    checkOutOfStock(stock, outOfStock) {
        if (stock === 0) {
            outOfStock = "매진";
        }
        return outOfStock;
    }

    /*
    f 매진 여부 확인 checkOutOfStock (재고, 매진 여부) 리턴값: '매진' || '판매중' { 
        //재고에 따라 매진 여부 결정.

        if(재고가 0일 때) {
            매진 여부 = '매진'
        }
        return '매진' || '판매중'
    }
    */

    // 구매 가능 상품 출력
    showAvailableItemList(insertedCoin) {
        const availableItemList = this.itemList.filter(val => val.price <= insertedCoin);
        if (availableItemList.length === 0) {
            console.log(`현재 잔액으로 추가 선택 가능한 상품이 없습니다.`);
        } else {
            availableItemList.sort(function (a, b) {
                return a.itemNo - b.itemNo;
            });
            console.log(`=====제품을 선택해주세요.=====`);
            availableItemList.forEach(val =>
                console.log(`번호: ${val.itemNo}, 제품명: ${val.itemName}, 가격: ${val.price}원 (${val.outOfStock})`)
            )
        }
    }

    /*
    f 구매 가능 상품 리스트 showAvailableItemList (투입 금액 || 잔액 ) {
        //투입 금액 또는 구매 후 잔액에 따라 구매 가능 상품 리스트 출력.
                
        const 구매 가능 리스트 = 상품 리스트.filter(투입 금액 또는 잔액보다 적은 가격의 상품만 필터링)
        if (구매 가능 리스트가 비어있을 때) {
            console.log(선택 가능 상품 없음 메시지)
                
        } else {
            구매 가능 상품 리스트 오름차순 정렬
            구매 가능 상품 리스트.forEach(리스트 출력)
        }
    }
    */


} // end class

// 자판기 재고 관리 클래스
const VendingMachineStockManagement = class {

    // 신규 상품 등록
    registerNewItem(itemName, quantity, price) {
        const itemNoLimit = 15; // 자판기에 추가할 수 있는 품목은 최대 15개로 제한
        const itemNo = this.assignItemNo(itemNoLimit);
        if (!itemNo) return; // 품목 초과시 추가 등록 금지
        const newItemInfo = this.composeItemInfo(itemNo, itemName, quantity, price);
        vmManager.itemList.push(newItemInfo);
        console.log(`'${newItemInfo.itemName}'(${newItemInfo.price}원) ${newItemInfo.stock}개가 ${newItemInfo.itemNo}번 품목에 등록되었습니다.`);
    }

    /*
    f 신규 상품 등록 registerNewItem (상품명, 수량, 가격) {
        //신규 상품에 대해 새로운 번호 부여(메소드 호출).
        //품목수 제한 설정.
        //신규 상품 정보 생성 및 상품 리스트에 추가.

        const 품목수 제한 = 15
        const 신규 상품 번호 = f 상품 번호 부여 메소드 호출(품목수 제한) return 상품 번호
        if(상품 번호가 없으면 : 품목수 제한 초과시 false) return(메소드 종료)
        const 신규 상품 정보 = f 상품 정보 생성 메소드 호출(상품 번호, 상품명, 수량, 가격) return 상품 정보
        상품 리스트.push(신규 상품 정보)
        console.log(상품 등록 완료 메시지)
    }
    */

    // 상품 번호 부여
    assignItemNo(itemNoLimit) {
        if (vmManager.itemNoList.length >= itemNoLimit) {
            console.log(`최대 등록 품목 개수 ${itemNoLimit}개를 초과하였습니다.`);
            return false;
        }
        else if (vmManager.deletedItemNoList.length === 0) {
            vmManager.itemNoList.push(++vmManager.itemNo);
            return vmManager.itemNo;
        } else {
            let deletedNo = vmManager.deletedItemNoList.shift();
            vmManager.itemNoList.push(deletedNo);
            return deletedNo;
        }
    }

    /*
    f 상품 번호 부여 assignItemNo (품목수 제한) 리턴값: false || 상품 번호 {
        //등록하려는 상품에 대해 번호 부여. 
        //품목수 제한 초과시 등록 금지 메시지 출력.
        //삭제된 상품 번호 리스트가 비어있는지 여부에 따라 신규 번호 생성 또는 기존 번호 재활용 결정. 
    
        if (상품 번호 리스트의 길이가 품목수 제한과 같거나 이상일 때) {
            console.log(최대 등록 품목 개수 초과 메시지)
            return false;

        } else if (삭제된 상품 번호 리스트가 비어있을 때) {
            상품 번호 리스트.push(++상품 번호)
            return 신규 상품 번호

        } else {
            let 삭제된 번호 = 삭제된 상품 번호 리스트.shift()
            상품 번호 리스트.push(삭제된 번호)
            return 기존 상품 번호
        }
    }
    */

    // 상품 정보 생성
    composeItemInfo(itemNo, itemName, quantity, price) {
        const itemInfo = {
            itemNo: itemNo,
            itemName: itemName,
            stock: quantity,
            price: price,
            outOfStock: undefined
        }
        itemInfo.stock > 0 ? itemInfo.outOfStock = "판매중"
            : itemInfo.stock == 0 ? itemInfo.outOfStock = "매진" : undefined;
        return itemInfo;
    }

    /*
    f 상품 정보 생성 composeItemInfo (상품 번호, 상품명, 수량, 가격) 리턴값: 신규 상품 정보 {
        //넘겨받은 인자를 바탕으로 신규 상품 정보를 생성. 
        //수량에 따라 매진 여부 결정('판매중' || '매진')
    
        const 신규 상품 정보 = 빈 객체 { 상품 번호, 상품명, 재고, 가격, 매진 여부 : 기본값 undefined }
        재고가 1 이상 ? 매진 여부를 '판매중', 0이면 '매진'으로 초기화(삼항연산자)       
        return 신규 상품 정보 
    }
    */

    // 가격 업데이트 
    updatePrice(itemNo, price) {
        vmManager.itemList.forEach(val => {
            if (val.itemNo === itemNo) {
                val.price = price;
                console.log(`${val.itemNo}번 품목(${val.itemName})의 가격이 ${val.price}원으로 변경되었습니다.)`);
            }
        })
    }

    /*
    f 가격 업데이트 updatePrice (상품 번호, 변경할 가격) {
        //상품 리스트에서 해당 상품 번호를 찾아 가격 수정. 
    
        상품 리스트.forEach({
            일치하는 상품 번호의 가격 = 변경할 가격 
            console.log(가격 변경 메시지)
        })      
    }
    */

    // 재고 업데이트
    updateStock(itemNo, quantity) {
        vmManager.itemList.forEach(val => {
            if (val.itemNo === itemNo) {
                val.stock = quantity;
                val.stock > 0 ? val.outOfStock = "판매중"
                    : val.stock == 0 ? val.outOfStock = "매진" : undefined;
                console.log(`${val.itemNo}번 품목(${val.itemName})의 재고가 ${val.stock}개로 변경되었습니다.)`);
            }
        });
    }

    /*
    f 재고 업데이트 updateStock (상품 번호, 변경할 재고) {
        //상품 리스트에서 해당 상품 번호를 찾아 재고 수정 

        상품 리스트.forEach({
            일치하는 상품 번호의 재고 = 변경할 재고
            변경된 재고가 0 이상 ? 매진 여부를 '판매중', 0이면 '매진'으로 초기화(삼항 연산자)
            console.log(재고 변경 완료 메시지)
        })      
    }
    */

    // 품목 삭제 
    deleteItem(itemNo) {
        vmManager.itemList.forEach((val, idx) => {
            if (val.itemNo === itemNo) {
                const targetNoIndex = vmManager.itemNoList.indexOf(val.itemNo); // 특정 no의 인덱스
                const itemName = val.itemName;
                vmManager.itemList.splice(idx, 1);
                vmManager.deletedItemNoList.push(vmManager.itemNoList.splice(targetNoIndex, 1)[0]);
                console.log(`${itemNo}번 '${itemName}' 품목이 삭제됐습니다.`);
                vmManager.deletedItemNoList.sort(function (a, b) {
                    return a - b;
                });
            }
        });
    }

    /*
    f 품목 삭제 deleteItem (상품 번호) {
        //상품 리스트에서 해당 상품 번호를 찾아 삭제.
        //삭제된 상품 번호는 삭제된 상품 번호 리스트에 별도로 저장하여 신규 상품 등록시 해당 번호 재활용.

        상품 리스트.forEach({
            if(삭제할 상품 번호와 일치하는 상품인 경우) {
                const 인덱스 = 상품 번호 리스트(배열)에서 삭제할 상품 번호의 인덱스
                const 상품명 = 상품명
                상품 리스트.splice(삭제할 상품의 인덱스)
                삭제된 상품 번호 리스트.push( 삭제된 상품 번호 : 상품 번호 리스트.splice(인덱스)[0번째 인덱스] )
                console.log(상품 삭제 완료 메시지)
                삭제된 상품 번호 리스트 오름차순 정렬
            }
        })      
    }
    */

} // end class


const vmManager = new VendingMachineUsage({
    stockManager: new VendingMachineStockManagement
});

vmManager.stockManager.registerNewItem("포카리스웨트", 2, 1200);
vmManager.stockManager.registerNewItem("나랑드사이다", 8, 800);
vmManager.stockManager.registerNewItem("미에로화이바", 3, 900);
vmManager.stockManager.registerNewItem("웰치스포도", 0, 1500);
vmManager.stockManager.registerNewItem("삼다수", 8, 900);
vmManager.stockManager.registerNewItem("하늘보리", 7, 1600);
vmManager.stockManager.registerNewItem("누카콜라", 0, 2200);
vmManager.stockManager.registerNewItem("우유에빠진코코아", 7, 1800);
vmManager.stockManager.registerNewItem("여명808", 3, 3800);
vmManager.stockManager.registerNewItem("데자와", 10, 1500);

console.log(vmManager.itemList);