import { type FC } from 'react';

import IconComponent from '@/components/Icon/Icon.component';

import { type ICategory } from '@/types';

import './CategoryConfig.container.css';

interface ICategoryConfigContainerProps {
  categoryList?: ICategory[];
  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory) => void;
}

const CategoryConfigContainer: FC<ICategoryConfigContainerProps> = (props) => {
  return (
    <>
      <div className="category-config">
        <div className="category-config__list">
          {/* <IconComponent icon="icon-list" /> */}
          <h2 className="category-config-title">{props.selectedCategory?.title ?? '카테고리'}</h2>
        </div>
        <button type="button" className="icon-btn">
          <IconComponent icon="icon-open" />
        </button>
      </div>
      <div className="category-config__container">
        {props.categoryList?.map((category) => (
          <div key={category.id} className="category-config__item">
            <div
              style={{
                backgroundColor: category.color,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                marginRight: '8px',
              }}
            />
            <button
              type="button"
              className="category-config__item-btn"
              onClick={() => props.setSelectedCategory(category)}
            >
              <span className="category-config__item-title">{category.title}</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryConfigContainer;
