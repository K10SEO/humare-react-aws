import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 3rem;
  border-radius: 50px 50px;
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  padding: 50px 40px;

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #718096;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: #e53e3e;
  margin-left: 3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const CheckboxGroup = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 14px;
  color: #2d3748;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  margin-top: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const SmallText = styled.small`
  color: #718096;
  margin-top: 5px;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 30px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fed7d7;
  color: #c53030;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fc8181;
`;

const SuccessMessage = styled.div`
  background-color: #c6f6d5;
  color: #2f855a;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #9ae6b4;
`;

const ContactFrom = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    content: '',
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // 입력 시 메시지 초기화
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
    setFormData(prev => ({
      ...prev,
      contact: value
    }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        contact: formData.contact,
        content: formData.content
      })
    });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('문의가 성공적으로 접수되었습니다.\n입력하신 연락처로 확인 문자가 발송됩니다.');
        
        // 폼 초기화
        setFormData({
          name: '',
          contact: '',
          content: '',
          privacy: false
        });

        // 3초 후 성공 메시지 제거
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        setErrorMessage(data.message || '문의 접수 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('문의 접수 오류:', error);
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <MainTitle>상담문의</MainTitle>
          <SubTitle>문의 남겨 주시면 빠르게 연락 드리겠습니다</SubTitle>
        </Header>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">
              이름<Required>*</Required>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
              disabled={isSubmitting}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact">
              연락처<Required>*</Required>
            </Label>
            <Input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleContactChange}
              placeholder="010-0000-0000"
              disabled={isSubmitting}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">
              상담내용<Required>*</Required>
            </Label>
            <TextArea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="상담 내용을 자세히 입력해주세요"
              disabled={isSubmitting}
              required
            />
          </FormGroup>

          <FormGroup>
            <CheckboxGroup>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <span>
                  개인정보 수집 및 이용에 동의합니다<Required>*</Required>
                  <SmallText>
                    수집항목: 이름, 연락처, 상담내용 | 이용목적: 상담 응대 | 보유기간: 상담 완료 후 1년
                  </SmallText>
                </span>
              </CheckboxLabel>
            </CheckboxGroup>
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '전송 중...' : '문의하기'}
          </SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default ContactFrom;