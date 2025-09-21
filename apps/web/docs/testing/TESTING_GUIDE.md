# 📚 Hướng Dẫn Đọc Unit Tests

## 🎯 Mục đích
File này giải thích cách đọc và hiểu unit tests trong dự án GoPOS, đặc biệt dành cho người mới học.

## 📖 Cấu trúc Unit Test

### 1. **Import và Setup**
```javascript
import { render, screen, fireEvent, act } from '@testing-library/react'
import ComponentName from '../ComponentName'
```
- `render`: Render component vào DOM ảo
- `screen`: Truy cập các element trong DOM
- `fireEvent`: Giả lập user interactions (click, type, etc.)
- `act`: Xử lý async operations trong React

### 2. **Mock Data - Dữ liệu giả**
```javascript
const mockData = {
  id: '1',
  name: 'Cà phê đen',
  price: 25000,
  // ... các properties khác
}
```
- **Tại sao cần mock data?** Vì chúng ta không muốn gọi database thật trong test
- **Mock data mô phỏng** cấu trúc dữ liệu thật từ database
- **Mỗi test case** có thể có mock data khác nhau để test các trường hợp khác nhau

### 3. **Mock Components - Component giả**
```javascript
jest.mock('../ChildComponent', () => {
  return function MockChildComponent({ prop1, prop2 }) {
    return <div data-testid="child">{prop1}</div>
  }
})
```
- **Tại sao cần mock components?** Vì chúng ta chỉ test component chính, không test component con
- **Mock components** đơn giản hóa việc test và tập trung vào logic chính
- **data-testid** giúp tìm element dễ dàng trong test

### 4. **Mock Functions - Function giả**
```javascript
const mockCallback = jest.fn()
```
- **jest.fn()** tạo function giả có thể track calls
- **toHaveBeenCalled()** kiểm tra function có được gọi không
- **toHaveBeenCalledWith()** kiểm tra function được gọi với tham số gì

## 🔍 Cách đọc Test Case

### Cấu trúc cơ bản:
```javascript
it('mô tả test case', () => {
  // Bước 1: Setup - Chuẩn bị dữ liệu
  // Bước 2: Action - Thực hiện hành động
  // Bước 3: Assert - Kiểm tra kết quả
})
```

### Ví dụ cụ thể:
```javascript
it('renders order item information correctly', () => {
  // Bước 1: Render component với mock props
  render(<OrderItem {...mockProps} />)
  
  // Bước 2: Kiểm tra từng thông tin có hiển thị đúng không
  expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  expect(screen.getByText('$50000.00')).toBeInTheDocument()
})
```

## 🛠️ Các hàm testing phổ biến

### **Tìm Elements:**
- `screen.getByText('text')` - Tìm element có text chính xác
- `screen.findByText('text')` - Tìm element có text (đợi async)
- `screen.getByTestId('testid')` - Tìm element bằng data-testid
- `screen.getByRole('button')` - Tìm element theo role

### **Kiểm tra kết quả:**
- `toBeInTheDocument()` - Element có tồn tại trong DOM
- `toHaveClass('class-name')` - Element có CSS class
- `toHaveAttribute('attr', 'value')` - Element có attribute
- `toHaveBeenCalled()` - Function có được gọi
- `toHaveBeenCalledWith('param')` - Function được gọi với tham số

### **User Interactions:**
- `fireEvent.click(element)` - Giả lập click
- `fireEvent.change(input, { target: { value: 'text' } })` - Giả lập typing
- `fireEvent.focus(element)` - Giả lập focus

## 📝 Các pattern thường gặp

### 1. **Async Testing:**
```javascript
it('handles async operations', async () => {
  await act(async () => {
    render(<Component />)
  })
  
  expect(await screen.findByText('Loaded')).toBeInTheDocument()
})
```

### 2. **Error Testing:**
```javascript
it('handles errors gracefully', () => {
  // Cấu hình mock để trả về lỗi
  mockFunction.mockRejectedValueOnce(new Error('Network error'))
  
  render(<Component />)
  
  // Kiểm tra error message hiển thị
  expect(screen.getByText('Error occurred')).toBeInTheDocument()
})
```

### 3. **Callback Testing:**
```javascript
it('calls callback when clicked', () => {
  const mockCallback = jest.fn()
  render(<Component onClick={mockCallback} />)
  
  fireEvent.click(screen.getByRole('button'))
  
  expect(mockCallback).toHaveBeenCalledWith('expected-param')
})
```

## 🎯 Mục đích của từng loại test

### **Rendering Tests:**
- Kiểm tra component render đúng
- Kiểm tra tất cả elements cần thiết xuất hiện
- Kiểm tra styling và layout

### **Interaction Tests:**
- Kiểm tra user interactions (click, type, etc.)
- Kiểm tra callbacks được gọi đúng
- Kiểm tra state changes

### **Error Handling Tests:**
- Kiểm tra component xử lý lỗi đúng cách
- Kiểm tra error messages hiển thị
- Kiểm tra fallback behavior

### **Edge Case Tests:**
- Kiểm tra với dữ liệu null/undefined
- Kiểm tra với dữ liệu rỗng
- Kiểm tra với dữ liệu không hợp lệ

## 💡 Tips cho người mới

1. **Đọc comment** - Mỗi test case đều có comment giải thích mục đích
2. **Hiểu mock data** - Xem cấu trúc dữ liệu để hiểu component cần gì
3. **Theo dõi flow** - Từ setup → action → assertion
4. **Chạy test** - `npm run test` để xem test pass/fail
5. **Debug** - Dùng `screen.debug()` để xem DOM structure

## 🚀 Chạy Tests

```bash
# Chạy tất cả tests
npm run test

# Chạy test với watch mode
npm run test -- --watch

# Chạy test với coverage
npm run test -- --coverage
```

## 📚 Tài liệu tham khảo

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
